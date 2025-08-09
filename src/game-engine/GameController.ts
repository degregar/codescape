import * as vscode from "vscode";

export class GameController {
  private context: vscode.ExtensionContext;
  private isPlayerInitialized: boolean = false;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public initializePlayer(): void {
    this.isPlayerInitialized = true;
    vscode.window.showInformationMessage(
      "🌐 Player profile initialized! Welcome to CODESCAPE."
    );

    // Show first awakening message
    vscode.window.showInformationMessage(
      "Reality flickers. Digital static clears. You open your eyes to find yourself in a vast network of interconnected systems..."
    );
  }

  public openGamePanel(): void {
    vscode.window.showInformationMessage("🌐 Opening CODESCAPE game panel...");
  }

  public handlePlayerAction(action: string): void {
    if (!this.isPlayerInitialized) {
      vscode.window.showWarningMessage(
        "Please initialize your player profile first!"
      );
      return;
    }

    console.log(`Player action received: ${action}`);

    // Handle the "wake up" command
    if (action.toLowerCase() === "wake up") {
      this.handleWakeUpCommand();
      return;
    }

    // Handle other commands
    vscode.window.showInformationMessage(`Command processed: ${action}`);
  }

  private handleWakeUpCommand(): void {
    const message = `
        🌐 DIGITAL AWAKENING INITIATED 🌐

        Your consciousness emerges from the static...
        
        You find yourself interfacing with a vast cyberpunk network.
        Reality bends around streams of flowing data.
        
        The system whispers: "Welcome to CODESCAPE, hacker."
        
        Type 'scan environment' to analyze your surroundings.
        `;

    vscode.window.showInformationMessage(message);
  }

  public dispose(): void {
    // Cleanup resources
    console.log("GameController disposed");
  }
}
