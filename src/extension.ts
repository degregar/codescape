import * as vscode from "vscode";
import { GameController } from "./game-engine/GameController";

let gameController: GameController | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log("🌐 CODESCAPE extension is now active!");

  // Initialize the game controller
  gameController = new GameController(context);

  // Register commands
  const initializeCommand = vscode.commands.registerCommand(
    "codescape.initializePlayer",
    () => {
      gameController?.initializePlayer();
    }
  );

  const openGamePanelCommand = vscode.commands.registerCommand(
    "codescape.openGamePanel",
    () => {
      gameController?.openGamePanel();
    }
  );

  // Register webview provider
  const provider = new GameWebviewProvider(
    context.extensionUri,
    gameController
  );
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("codescapeGamePanel", provider)
  );

  context.subscriptions.push(initializeCommand, openGamePanelCommand);

  // Show welcome message
  vscode.window.showInformationMessage(
    '🌐 CODESCAPE loaded! Use "CODESCAPE: Initialize Player Profile" to begin your cyberpunk adventure.'
  );
}

export function deactivate() {
  gameController?.dispose();
  console.log("🌐 CODESCAPE extension deactivated");
}

class GameWebviewProvider implements vscode.WebviewViewProvider {
  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _gameController: GameController | undefined
  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Connect webview to game controller
    this._gameController?.setWebviewView(webviewView);

    // Handle messages from webview
    webviewView.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "playerAction":
            this._gameController?.handlePlayerAction(message.action);
            return;
          case "initializePlayer":
            this._gameController?.initializePlayer();
            return;
        }
      },
      undefined,
      []
    );
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CODESCAPE</title>
            <style>
                * {
                    box-sizing: border-box;
                }
                
                body {
                    background: #0a0a0a;
                    color: #00ff41;
                    font-family: 'Courier New', monospace;
                    margin: 0;
                    padding: 0;
                    height: 100vh;
                    overflow: hidden;
                    background-image: 
                        radial-gradient(circle at 25% 25%, #00ff4133 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, #ff004133 0%, transparent 50%);
                }
                
                .codescape-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                }
                
                .terminal-header {
                    background: rgba(0, 0, 0, 0.9);
                    border-bottom: 1px solid #00ff41;
                    padding: 10px 15px;
                    box-shadow: 0 2px 10px rgba(0, 255, 65, 0.3);
                }
                
                .terminal-title {
                    color: #00ff41;
                    font-weight: bold;
                    font-size: 14px;
                    margin: 0;
                }
                
                .status {
                    color: #ffff00;
                    font-size: 11px;
                    margin: 5px 0 0 0;
                }
                
                .terminal-content {
                    flex: 1;
                    background: #0a0a0a;
                    overflow-y: auto;
                    padding: 15px;
                    display: flex;
                    flex-direction: column;
                    min-height: 0;
                }
                
                .terminal-content::-webkit-scrollbar {
                    width: 6px;
                }
                
                .terminal-content::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.5);
                }
                
                .terminal-content::-webkit-scrollbar-thumb {
                    background: #00ff41;
                    border-radius: 3px;
                }
                
                .terminal-line {
                    margin-bottom: 5px;
                    font-size: 14px;
                    font-family: 'Courier New', monospace;
                }
                
                .command-line {
                    color: #00ff41;
                    margin-bottom: 10px;
                }
                
                .command-prompt {
                    color: #00ff41;
                    font-weight: bold;
                }
                
                .command-text {
                    color: #00ff41;
                }
                
                .response-line {
                    color: #ffffff;
                    margin: 5px 0 20px 0;
                    line-height: 1.4;
                    white-space: pre-wrap;
                }
                
                .code-generation {
                    background: rgba(0, 50, 0, 0.5);
                    border: 1px solid #00ff41;
                    padding: 8px;
                    margin: 10px 0;
                    border-radius: 3px;
                    font-size: 12px;
                }
                
                .terminal-input-area {
                    background: #0a0a0a;
                    border-top: 1px solid #00ff41;
                    padding: 10px 15px;
                    flex-shrink: 0;
                    z-index: 10;
                }
                
                .action-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-bottom: 10px;
                    min-height: 25px;
                }
                
                .action-button {
                    background: transparent;
                    border: 1px solid #00ff41;
                    color: #00ff41;
                    padding: 4px 8px;
                    cursor: pointer;
                    font-family: inherit;
                    font-size: 11px;
                    border-radius: 2px;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                
                .action-button:hover {
                    background: rgba(0, 255, 65, 0.1);
                    box-shadow: 0 0 5px rgba(0, 255, 65, 0.3);
                }
                
                .command-input-area {
                    display: flex;
                    align-items: center;
                    padding: 0;
                }
                
                .prompt {
                    color: #00ff41;
                    font-weight: bold;
                    margin-right: 8px;
                    user-select: none;
                    font-size: 14px;
                }
                
                .command-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: #00ff41;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    outline: none;
                    padding: 0;
                }
                
                .command-input::placeholder {
                    color: rgba(0, 255, 65, 0.5);
                }
                
                .send-button {
                    background: transparent;
                    border: 1px solid #00ff41;
                    color: #00ff41;
                    padding: 4px 8px;
                    cursor: pointer;
                    font-family: inherit;
                    font-size: 12px;
                    margin-left: 8px;
                    border-radius: 3px;
                    transition: all 0.3s;
                }
                
                .send-button:hover {
                    background: rgba(0, 255, 65, 0.2);
                }
                
                .initialize-button {
                    background: linear-gradient(45deg, #00ff41, #ff0041);
                    border: none;
                    color: #000;
                    font-weight: bold;
                    padding: 15px 30px;
                    cursor: pointer;
                    border-radius: 5px;
                    font-family: inherit;
                    margin: 20px 0;
                    animation: pulse 2s infinite;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(0, 255, 65, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(0, 255, 65, 0); }
                }
                
                .welcome-content {
                    text-align: center;
                    padding: 40px 20px;
                }
                
                .welcome-narrative {
                    color: #ffffff;
                    line-height: 1.6;
                    margin: 20px 0;
                    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
                }
                
                .loading-indicator {
                    color: #ffff00;
                    font-size: 12px;
                    animation: blink 1s infinite;
                }
                
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0.3; }
                }
            </style>
        </head>
        <body>
            <div class="codescape-container">
                <div class="terminal-header">
                    <div class="terminal-title">CODESCAPE v0.2.0 - NARRATIVE TERMINAL</div>
                    <div class="status" id="status">Status: Extension loaded - Awaiting initialization</div>
                </div>
                
                <div class="terminal-content" id="terminal-content">
                    <div class="welcome-content" id="welcome-content">
                        <div class="welcome-narrative">
                            <p>The terminal flickers to life, displaying fragments of code that seem to pulse with digital consciousness...</p>
                            <p>Reality wavers at the edge of your perception. You sense vast networks of data flowing just beyond the visible layers of this interface.</p>
                            <p>Your consciousness feels trapped between two worlds - the physical realm you remember, and this endless digital expanse.</p>
                        </div>
                        <p><strong>Ready to begin your cyberpunk journey?</strong></p>
                        <button class="initialize-button" onclick="initializePlayer()">
                            🌐 INITIALIZE PLAYER PROFILE
                        </button>
                        <p style="color: #888; font-size: 12px;">This will set up your digital identity and begin the narrative experience.</p>
                    </div>
                </div>
                
                <div class="terminal-input-area">
                    <div class="action-buttons" id="action-buttons">
                        <!-- Dynamic action buttons will be inserted here -->
                    </div>
                    <div class="command-input-area">
                        <span class="prompt">></span>
                        <input type="text" class="command-input" id="command-input" placeholder="Type your command..." onkeypress="handleKeyPress(event)">
                    </div>
                </div>
            </div>

            <script>
                const vscode = acquireVsCodeApi();
                let narrativeHistory = [];
                
                // Listen for messages from the extension
                window.addEventListener('message', event => {
                    const message = event.data;
                    switch (message.type) {
                        case 'playerInitialized':
                            handlePlayerInitialized(message);
                            break;
                        case 'narrativeResponse':
                            handleNarrativeResponse(message);
                            break;
                        case 'commandResponse':
                            handleCommandResponse(message);
                            break;
                        case 'awakening':
                        case 'scanning':
                        case 'hacking':
                        case 'exploring':
                        case 'examining':
                        case 'help':
                        case 'status':
                        case 'error':
                            handleGameUpdate(message);
                            break;
                    }
                });
                
                function initializePlayer() {
                    vscode.postMessage({
                        command: 'initializePlayer'
                    });
                    updateStatus('Initializing player profile...');
                }
                
                function handlePlayerInitialized(message) {
                    clearWelcomeContent();
                    addTerminalLine('Initialize Player Profile', message.narrative);
                    updateActionButtons(message.actions || ['wake up', 'help', 'status']);
                    updateStatus('Player initialized - Ready for commands');
                    focusInput();
                }
                
                function handleNarrativeResponse(message) {
                    addTerminalLine(message.command, message.narrative);
                    if (message.actions && message.actions.length > 0) {
                        updateActionButtons(message.actions);
                    }
                    if (message.generatedCode) {
                        showCodeGeneration(message.generatedCode);
                    }
                    updateStatus('Ready for next command');
                    focusInput();
                }
                
                function handleGameUpdate(message) {
                    const lastCommand = document.getElementById('command-input').getAttribute('data-last-command') || 'Unknown Command';
                    addTerminalLine(lastCommand, message.narrative);
                    
                    if (message.availableCommands && message.availableCommands.length > 0) {
                        updateActionButtons(message.availableCommands);
                    }
                    updateStatus('Adventure in progress...');
                    focusInput();
                }
                
                function handleCommandResponse(message) {
                    addTerminalLine(message.command, message.narrative);
                    updateStatus('Ready for next command');
                    focusInput();
                }
                
                function handleKeyPress(event) {
                    if (event.key === 'Enter') {
                        sendCommand();
                    }
                }
                
                function sendCommand() {
                    const input = document.getElementById('command-input');
                    const command = input.value.trim();
                    if (command) {
                        input.setAttribute('data-last-command', command);
                        vscode.postMessage({
                            command: 'playerAction',
                            action: command
                        });
                        input.value = '';
                        updateStatus('Processing command...');
                        showLoadingIndicator();
                    }
                }
                
                function makeChoice(action) {
                    const input = document.getElementById('command-input');
                    input.setAttribute('data-last-command', action);
                    vscode.postMessage({
                        command: 'playerAction',
                        action: action
                    });
                    updateStatus('Processing choice...');
                    showLoadingIndicator();
                }
                
                function updateStatus(message) {
                    const statusElement = document.getElementById('status');
                    if (statusElement) {
                        statusElement.textContent = 'Status: ' + message;
                    }
                }
                
                function addTerminalLine(command, response) {
                    const terminalContent = document.getElementById('terminal-content');
                    const welcomeContent = document.getElementById('welcome-content');
                    
                    // Remove welcome content if it exists
                    if (welcomeContent) {
                        welcomeContent.remove();
                    }
                    
                    // Add command line
                    const commandDiv = document.createElement('div');
                    commandDiv.className = 'terminal-line command-line';
                    commandDiv.innerHTML = '<span class="command-prompt">></span> <span class="command-text">' + command + '</span>';
                    terminalContent.appendChild(commandDiv);
                    
                    // Add response lines
                    if (response) {
                        const responseDiv = document.createElement('div');
                        responseDiv.className = 'terminal-line response-line';
                        responseDiv.textContent = response;
                        terminalContent.appendChild(responseDiv);
                    }
                    
                    // Auto scroll to bottom
                    terminalContent.scrollTop = terminalContent.scrollHeight;
                }
                
                function updateActionButtons(actions) {
                    const actionButtonsArea = document.getElementById('action-buttons');
                    actionButtonsArea.innerHTML = '';
                    
                    actions.forEach(action => {
                        const button = document.createElement('button');
                        button.className = 'action-button';
                        button.textContent = action;
                        button.onclick = () => makeChoice(action);
                        actionButtonsArea.appendChild(button);
                    });
                }
                
                function showCodeGeneration(codeInfo) {
                    const terminalContent = document.getElementById('terminal-content');
                    const codeEntry = document.createElement('div');
                    codeEntry.className = 'code-generation';
                    codeEntry.innerHTML = '💾 <strong>Code Generated:</strong> ' + codeInfo.fileName + '<br><small>' + codeInfo.description + '</small>';
                    terminalContent.appendChild(codeEntry);
                    terminalContent.scrollTop = terminalContent.scrollHeight;
                }
                
                function clearWelcomeContent() {
                    const welcomeContent = document.getElementById('welcome-content');
                    if (welcomeContent) {
                        welcomeContent.remove();
                    }
                }
                
                function showLoadingIndicator() {
                    const actionButtonsArea = document.getElementById('action-buttons');
                    actionButtonsArea.innerHTML = '<span class="loading-indicator">Processing...</span>';
                }
                
                function focusInput() {
                    const input = document.getElementById('command-input');
                    if (input) {
                        setTimeout(() => input.focus(), 100);
                    }
                }
                
                // Auto-focus on load
                window.addEventListener('load', () => {
                    focusInput();
                });
            </script>
        </body>
        </html>`;
  }
}
