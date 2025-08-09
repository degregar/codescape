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
                body {
                    background: #0a0a0a;
                    color: #00ff41;
                    font-family: 'Courier New', monospace;
                    margin: 0;
                    padding: 20px;
                    min-height: 100vh;
                    background-image: 
                        radial-gradient(circle at 25% 25%, #00ff4133 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, #ff004133 0%, transparent 50%);
                }
                .terminal {
                    background: rgba(0, 0, 0, 0.8);
                    border: 1px solid #00ff41;
                    border-radius: 5px;
                    padding: 15px;
                    margin: 10px 0;
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
                }
                .prompt {
                    color: #00ff41;
                    font-weight: bold;
                }
                .narrative {
                    color: #ffffff;
                    line-height: 1.6;
                    margin: 15px 0;
                    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
                }
                .input-area {
                    display: flex;
                    margin-top: 15px;
                }
                .input-area input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: #00ff41;
                    font-family: inherit;
                    font-size: 14px;
                    outline: none;
                    border-bottom: 1px solid #00ff41;
                    padding: 5px;
                }
                .choices {
                    margin: 15px 0;
                }
                .choice-button {
                    display: block;
                    width: 100%;
                    background: transparent;
                    border: 1px solid #00ff41;
                    color: #00ff41;
                    padding: 10px;
                    margin: 5px 0;
                    cursor: pointer;
                    font-family: inherit;
                    transition: all 0.3s;
                }
                .choice-button:hover {
                    background: rgba(0, 255, 65, 0.1);
                    box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
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
                }
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(0, 255, 65, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(0, 255, 65, 0); }
                }
                .status {
                    color: #ffff00;
                    font-size: 12px;
                    margin: 10px 0;
                }
            </style>
        </head>
        <body>
            <div class="terminal">
                <div class="prompt">CODESCAPE v0.1.0 - DIGITAL REALITY INTERFACE</div>
                <div class="status">Status: Extension loaded - Awaiting initialization</div>
                
                <div class="narrative">
                    <p>The terminal flickers to life, displaying fragments of code that seem to pulse with digital consciousness...</p>
                    <p>Reality wavers at the edge of your perception. You sense vast networks of data flowing just beyond the visible layers of this interface.</p>
                    <p>Your consciousness feels trapped between two worlds - the physical realm you remember, and this endless digital expanse.</p>
                </div>

                <div id="game-content">
                    <p><strong>Ready to begin your cyberpunk journey?</strong></p>
                    <button class="initialize-button" onclick="initializePlayer()">
                        🌐 INITIALIZE PLAYER PROFILE
                    </button>
                    <p style="color: #888; font-size: 12px;">This will set up your digital identity and begin the narrative experience.</p>
                </div>

                <div class="input-area">
                    <span class="prompt">>>> </span>
                    <input type="text" id="command-input" placeholder="Type your command..." onkeypress="handleKeyPress(event)">
                </div>
            </div>

            <script>
                const vscode = acquireVsCodeApi();
                
                // Listen for messages from the extension
                window.addEventListener('message', event => {
                    const message = event.data;
                    switch (message.type) {
                        case 'playerInitialized':
                            handlePlayerInitialized(message);
                            break;
                        case 'awakening':
                        case 'scanning':
                        case 'hacking':
                        case 'exploring':
                            handleGameUpdate(message);
                            break;
                        case 'commandResponse':
                            handleCommandResponse(message);
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
                    const gameContent = document.getElementById('game-content');
                    gameContent.innerHTML = '<div class="narrative">' + message.narrative + '</div>' +
                        '<p style="color: #ffff00; font-weight: bold;">' +
                        '💡 Type "wake up" in the terminal below to begin your adventure!' +
                        '</p>';
                    updateStatus('Player initialized - Ready for commands');
                    
                    // Focus on input field
                    const input = document.getElementById('command-input');
                    if (input) input.focus();
                }
                
                function handleGameUpdate(message) {
                    const gameContent = document.getElementById('game-content');
                    let content = '<div class="narrative">' + message.narrative + '</div>';
                    
                    if (message.choices && message.choices.length > 0) {
                        content += '<div class="choices">';
                        for (let i = 0; i < message.choices.length; i++) {
                            const choice = message.choices[i];
                            content += '<button class="choice-button" onclick="makeChoice(\\''+choice.id+'\\')">'+choice.text+'</button>';
                        }
                        content += '</div>';
                    }
                    
                    if (gameContent) gameContent.innerHTML = content;
                    updateStatus('Adventure in progress...');
                }
                
                function handleCommandResponse(message) {
                    addToTerminal(message.narrative);
                }
                
                function handleKeyPress(event) {
                    if (event.key === 'Enter') {
                        const input = document.getElementById('command-input');
                        const command = input.value.trim();
                        if (command) {
                            vscode.postMessage({
                                command: 'playerAction',
                                action: command
                            });
                            input.value = '';
                            addToTerminal('>>> ' + command);
                            updateStatus('Processing command...');
                        }
                    }
                }
                
                function updateStatus(message) {
                    const statusElement = document.querySelector('.status');
                    if (statusElement) {
                        statusElement.textContent = 'Status: ' + message;
                    }
                }
                
                function addToTerminal(text) {
                    const terminal = document.querySelector('.terminal');
                    const p = document.createElement('p');
                    p.style.color = '#00ff41';
                    p.textContent = text;
                    terminal.appendChild(p);
                    terminal.scrollTop = terminal.scrollHeight;
                }
                
                function showChoices(choices) {
                    const gameContent = document.getElementById('game-content');
                    let choicesHtml = '';
                    for (let i = 0; i < choices.length; i++) {
                        const choice = choices[i];
                        choicesHtml += '<button class="choice-button" onclick="makeChoice(\\''+choice.id+'\\')">'+choice.text+'</button>';
                    }
                    gameContent.innerHTML = '<div class="choices">'+choicesHtml+'</div>';
                }
                
                function makeChoice(choiceId) {
                    vscode.postMessage({
                        command: 'playerAction',
                        action: choiceId
                    });
                    updateStatus('Processing choice...');
                }
                
                function updateGameContent(content) {
                    const gameContent = document.getElementById('game-content');
                    gameContent.innerHTML = content;
                }
            </script>
        </body>
        </html>`;
  }
}
