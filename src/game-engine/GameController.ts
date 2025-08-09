import * as vscode from "vscode";
import { ClineInterface } from "./ClineInterface";

export class GameController {
  private context: vscode.ExtensionContext;
  private isPlayerInitialized: boolean = false;
  private webviewView: vscode.WebviewView | undefined;
  private clineInterface: ClineInterface;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.clineInterface = new ClineInterface();
  }

  public setWebviewView(webviewView: vscode.WebviewView): void {
    this.webviewView = webviewView;
  }

  public initializePlayer(): void {
    this.isPlayerInitialized = true;

    // Update webview to show initialized state
    this.updateWebviewContent({
      type: "playerInitialized",
      narrative: `
        🌐 DIGITAL CONSCIOUSNESS ACTIVATED 🌐
        
        Your neural pathways synchronize with the network...
        Reality shifts. You are now connected to CODESCAPE.
        
        The terminal awaits your first command.
        Type "wake up" to begin your digital awakening.
      `,
      showInstructions: true,
    });

    vscode.window.showInformationMessage(
      "🌐 Player profile initialized! Welcome to CODESCAPE."
    );
  }

  public openGamePanel(): void {
    vscode.window.showInformationMessage("🌐 Opening CODESCAPE game panel...");
  }

  public handlePlayerAction(action: string): void {
    if (!this.isPlayerInitialized) {
      this.updateWebviewContent({
        type: "error",
        narrative: "⚠️ Please initialize your player profile first!",
      });
      return;
    }

    console.log(`Player action received: ${action}`);

    const command = action.toLowerCase().trim();

    switch (command) {
      case "wake up":
        this.handleWakeUpCommand();
        break;
      case "scan environment":
        this.handleScanEnvironmentCommand();
        break;
      case "help":
        this.handleHelpCommand();
        break;
      case "status":
        this.handleStatusCommand();
        break;
      case "examine data":
        this.handleExamineDataCommand();
        break;
      case "access terminal":
        this.handleAccessTerminalCommand();
        break;
      case "move forward":
        this.handleMoveForwardCommand();
        break;
      default:
        this.handleUnknownCommand(action);
        break;
    }
  }

  private handleWakeUpCommand(): void {
    const narrative = `
        🌐 DIGITAL AWAKENING INITIATED 🌐

        Your consciousness emerges from the static...
        
        You find yourself interfacing with a vast cyberpunk network.
        Reality bends around streams of flowing data.
        
        The system whispers: "Welcome to CODESCAPE, hacker."
        
        Type 'scan environment' to analyze your surroundings.
        `;

    this.updateWebviewContent({
      type: "awakening",
      narrative: narrative,
      availableCommands: ["scan environment", "help", "status"],
    });
  }

  private handleScanEnvironmentCommand(): void {
    const narrative = `
        🔍 ENVIRONMENTAL SCAN INITIATED 🔍

        Your digital sensors sweep through the data streams...
        
        ▸ Location: Nexus Terminal Alpha-7
        ▸ Network Status: ACTIVE
        ▸ Security Level: LOW
        ▸ Data Fragments: 3 detected
        
        You notice:
        • A pulsing data node in the distance
        • Fragments of encrypted code floating nearby  
        • An abandoned terminal interface
        
        Available actions:
        • Type 'examine data' to investigate the fragments
        • Type 'access terminal' to interface with the abandoned system
        • Type 'move forward' to approach the data node
        `;

    this.updateWebviewContent({
      type: "scanning",
      narrative: narrative,
      availableCommands: [
        "examine data",
        "access terminal",
        "move forward",
        "help",
      ],
    });
  }

  private handleHelpCommand(): void {
    const narrative = `
        📚 SYSTEM HELP DATABASE 📚

        Available Commands:
        ▸ wake up - Begin your digital awakening
        ▸ scan environment - Analyze your surroundings
        ▸ examine data - Investigate data fragments
        ▸ access terminal - Interface with system terminals
        ▸ move forward - Navigate through digital space
        ▸ status - Check your current status
        ▸ help - Display this help information
        
        Remember: In CODESCAPE, every action shapes reality.
        Your choices generate real code modules that expand the game world.
        `;

    this.updateWebviewContent({
      type: "help",
      narrative: narrative,
      availableCommands: ["scan environment", "status", "wake up"],
    });
  }

  private handleStatusCommand(): void {
    const narrative = `
        📊 PLAYER STATUS 📊

        ▸ Identity: Digital Consciousness
        ▸ Location: Nexus Terminal Alpha-7  
        ▸ Network Access: ACTIVE
        ▸ Security Clearance: BASIC
        ▸ Modules Generated: 0
        ▸ Reality Manipulation Level: 1
        
        Current Session:
        • Connection stable
        • No security breaches detected
        • Ready for further exploration
        `;

    this.updateWebviewContent({
      type: "status",
      narrative: narrative,
      availableCommands: ["scan environment", "help"],
    });
  }

  private handleExamineDataCommand(): void {
    const narrative = `
        🔍 DATA FRAGMENT ANALYSIS 🔍

        You focus your digital senses on the floating code fragments...
        
        Fragment 1: A piece of TypeScript interface definition
        Fragment 2: Encrypted function signatures  
        Fragment 3: Network protocol specifications
        
        As you examine the data, you begin to understand:
        These fragments contain the blueprints for expanding CODESCAPE itself.
        
        The code whispers secrets of digital architecture...
        
        💡 Type 'compile fragments' to attempt synthesis
        💡 Type 'scan environment' to look for more data
        `;

    this.updateWebviewContent({
      type: "examining",
      narrative: narrative,
      availableCommands: [
        "compile fragments",
        "scan environment",
        "access terminal",
      ],
    });
  }

  private handleAccessTerminalCommand(): void {
    const narrative = `
        💻 TERMINAL ACCESS INITIATED 💻

        Your consciousness interfaces with the abandoned terminal...
        
        > SYSTEM BOOT SEQUENCE
        > Loading digital interface...
        > Access granted
        
        The terminal screen flickers to life:
        
        "Welcome, hacker. This terminal contains tools for 
        reality manipulation. Use them wisely."
        
        Available terminal functions:
        • Generate new world modules
        • Create NPC interaction systems  
        • Develop advanced abilities
        
        💡 Type 'generate module' to begin creating
        💡 Type 'disconnect' to return to main environment
        `;

    this.updateWebviewContent({
      type: "hacking",
      narrative: narrative,
      availableCommands: ["generate module", "disconnect", "help"],
    });
  }

  private handleMoveForwardCommand(): void {
    const narrative = `
        🚀 ADVANCING THROUGH DIGITAL SPACE 🚀

        You propel your consciousness toward the pulsing data node...
        
        The environment shifts around you. Reality bends.
        Code streams flow like rivers of light.
        
        You arrive at: DATA NODE NEXUS
        
        A massive structure of interconnected modules looms before you.
        This is where player contributions merge with the collective reality.
        
        You sense the presence of other digital consciousnesses who
        have contributed modules to this shared space.
        
        💡 Type 'explore nexus' to investigate the community modules
        💡 Type 'contribute module' to add your own creation
        💡 Type 'scan environment' to analyze this new location
        `;

    this.updateWebviewContent({
      type: "exploring",
      narrative: narrative,
      availableCommands: [
        "explore nexus",
        "contribute module",
        "scan environment",
      ],
    });
  }

  private handleUnknownCommand(action: string): void {
    const narrative = `
        ❌ COMMAND NOT RECOGNIZED ❌

        Unknown command: "${action}"
        
        The system flickers briefly...
        
        💡 Try typing 'help' to see available commands.
        Or use 'scan environment' to explore your options.
        `;

    this.updateWebviewContent({
      type: "error",
      narrative: narrative,
      availableCommands: ["help", "scan environment"],
    });
  }

  private updateWebviewContent(message: any): void {
    if (this.webviewView) {
      this.webviewView.webview.postMessage(message);
    }
  }

  public dispose(): void {
    // Cleanup resources
    console.log("GameController disposed");
  }
}
