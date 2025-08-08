# Technical Context: CODESCAPE - VSCode Extension

## Technology Stack

### Core Technologies

- **TypeScript 5.0+**: Type-safe development across all modules
- **VSCode Extension API**: Integration with development environment
- **React 18**: UI framework for game interface panels
- **SQLite3**: Local database for player progress and state
- **Model Context Protocol (MCP)**: External data servers for world/NPC data
- **Node.js**: Runtime for extension and MCP servers

### Development Architecture

- **VSCode Extension Host**: Main execution environment
- **React Webview Provider**: Game interface rendering
- **MCP Server Network**: Distributed game data sources
- **Git-based Module System**: Community contribution workflow
- **Security Sandbox**: Restricted command execution environment

## Extension Structure

### Project Layout

```
codescape/
├── package.json                     # VSCode extension manifest
├── src/
│   ├── extension.ts                 # Extension entry point
│   ├── game-engine/
│   │   ├── GameController.ts        # Core game orchestration
│   │   ├── ClineInterface.ts        # Cline communication bridge
│   │   ├── SecuritySandbox.ts       # Command validation layer
│   │   ├── ModuleLoader.ts          # Dynamic module system
│   │   └── StateManager.ts          # Three-layer state system
│   ├── ui/
│   │   ├── webview/                 # VSCode webview providers
│   │   ├── sidebar/                 # React components
│   │   │   ├── GamePanel.tsx        # Main game UI
│   │   │   ├── DevPanel.tsx         # Developer transparency
│   │   │   └── ModuleManager.tsx    # Community modules
│   │   └── styles/                  # Cyberpunk theming
│   └── types/
│       ├── GameModule.ts            # Module interface definitions
│       ├── GameState.ts             # State type definitions
│       └── MCPServer.ts             # MCP interface types
├── modules/                         # Community contributions
│   ├── worlds/
│   ├── npcs/
│   ├── abilities/
│   └── mechanics/
├── mcp-servers/                     # Model Context Protocol servers
│   ├── world-data/
│   ├── npc-dialogue/
│   └── game-mechanics/
└── player-data/                     # Local game state (gitignored)
    ├── progress.db                  # SQLite database
    └── generated-code/              # Player's generated modules
```

### Core Type Definitions

```typescript
// GameModule.ts
export interface GameModule {
  manifest: ModuleManifest;
  initialize(context: GameContext): Promise<void>;
  getAvailableActions(): Action[];
  executeAction(actionId: string, params: any): Promise<ActionResult>;
  onPlayerChoice(choice: PlayerChoice): Promise<ChoiceResult>;
}

export interface ModuleManifest {
  id: string;
  name: string;
  version: string;
  author: string;
  type: "world" | "npc" | "ability" | "mechanic";
  dependencies: string[];
  mcpServers?: string[];
  permissions: SecurityPermission[];
  entryPoint: string;
}

// GameState.ts
export interface PlayerState {
  playerId: string;
  currentWorld: string;
  currentLocation: string;
  unlockedAbilities: string[];
  inventory: InventoryItem[];
  reputation: ReputationMap;
  generatedModules: GeneratedModule[];
}

export interface GameWorld {
  worldId: string;
  name: string;
  description: string;
  locations: Location[];
  npcs: NPC[];
  availableModules: string[];
}
```

## Security Architecture

### Command Sandbox Implementation

```typescript
export class SecuritySandbox {
  private readonly ALLOWED_COMMANDS = [
    // File operations (restricted paths)
    /^touch \.\/modules\/.+/,
    /^mkdir \.\/player-data\/.+/,
    /^echo .+ > \.\/generated-code\/.+/,

    // Safe npm operations
    /^npm init --yes$/,
    /^npm install --save-dev @types\/.+/,

    // Local git operations
    /^git init$/,
    /^git add \.\/modules\/.+/,
    /^git commit -m ".+"$/,
  ];

  private readonly BLOCKED_PATHS = [
    /^~\//,
    /^\/home/,
    /^\/Users/,
    /^C:\\/,
    /\.\.\//,
    /^\/etc/,
    /^\/var/,
    /^\/bin/,
  ];

  public validateCommand(command: string): SecurityValidation {
    const isCommandAllowed = this.ALLOWED_COMMANDS.some((pattern) =>
      pattern.test(command)
    );

    const hasBlockedPath = this.BLOCKED_PATHS.some((pattern) =>
      pattern.test(command)
    );

    return {
      allowed: isCommandAllowed && !hasBlockedPath,
      reason: this.getValidationReason(command),
      sanitizedCommand: this.sanitizeCommand(command),
    };
  }
}
```

### Module Validation System

```typescript
export class ModuleValidator {
  public validateModule(module: GameModule): ValidationResult {
    return {
      security: this.validateSecurity(module),
      codeQuality: this.validateTypeScript(module),
      narrative: this.validateNarrativeConsistency(module),
      integration: this.validateDependencies(module),
      language: this.validateEnglishOnly(module),
    };
  }

  private validateEnglishOnly(module: GameModule): boolean {
    // Ensure all strings, comments, and documentation are in English
    const content = this.extractAllStrings(module);
    return this.isEnglishContent(content);
  }
}
```

## MCP Server Architecture

### World Data Server

```typescript
// mcp-servers/world-data/server.ts
export class WorldDataServer implements MCPServer {
  private worldDatabase: WorldDatabase;

  public async getLocation(locationId: string): Promise<LocationData> {
    return {
      id: locationId,
      name: "Neon District",
      description: "Rain-slicked streets reflect holographic advertisements...",
      atmosphere: "cyberpunk-noir",
      availableActions: [
        { id: "scan_area", name: "Scan the environment", cost: 1 },
        { id: "hack_terminal", name: "Access nearby terminal", cost: 3 },
        { id: "talk_to_contact", name: "Find local contact", cost: 2 },
      ],
      hiddenElements: ["data_cache", "secret_entrance"],
      connectedLocations: ["underground_network", "corpo_tower"],
      requiredAbilities: ["basic_hacking", "street_knowledge"],
    };
  }

  public async executeLocationAction(
    locationId: string,
    actionId: string,
    playerContext: PlayerContext
  ): Promise<ActionResult> {
    // Generate Cline commands based on narrative choice
    const clineCommands = this.mapActionToCommands(actionId);
    return {
      success: true,
      narrative: "You successfully interface with the digital environment...",
      generatedCode: clineCommands,
      unlockedContent: ["new_ability_module", "hidden_location"],
      stateChanges: {
        reputation: { hackers: +1 },
        abilities: ["terminal_interface"],
      },
    };
  }
}
```

### NPC Dialogue Server

```typescript
// mcp-servers/npc-dialogue/server.ts
export class NPCDialogueServer implements MCPServer {
  public async getNPCDialogue(
    npcId: string,
    conversationState: ConversationState
  ): Promise<DialogueNode> {
    return {
      npcId,
      currentNode: "greeting",
      text: "The figure in the trench coat turns towards you, cybernetic eyes gleaming...",
      mood: "cautious",
      availableResponses: [
        {
          id: "friendly_approach",
          text: "I need information about the corporate networks",
          consequences: ["reputation_increase", "info_unlock"],
          clineAction: "generate_info_module",
        },
        {
          id: "direct_question",
          text: "What do you know about the security breach?",
          consequences: ["skip_introduction", "combat_risk"],
          clineAction: "create_security_scanner",
        },
      ],
      backgroundActions: ["update_relationship_map", "log_conversation"],
    };
  }
}
```

## State Management System

### Three-Layer Architecture

```typescript
export class StateManager {
  private globalState: GitRepository; // Shared world state
  private localState: SQLiteDatabase; // Player progress
  private sessionState: Map<string, any>; // Runtime state

  public async savePlayerChoice(choice: PlayerChoice): Promise<void> {
    // Local state: player-specific progress
    await this.localState.execute(
      `
            INSERT INTO player_choices 
            (choice_id, world_id, location_id, action_taken, timestamp, result)
            VALUES (?, ?, ?, ?, ?, ?)
        `,
      [
        choice.id,
        choice.worldId,
        choice.locationId,
        choice.action,
        Date.now(),
        JSON.stringify(choice.result),
      ]
    );

    // Session state: current gameplay context
    this.sessionState.set("current_choice", choice);
    this.sessionState.set("pending_modules", choice.generatedModules);
  }

  public async exportModuleContribution(
    moduleId: string
  ): Promise<ContributionPackage> {
    const moduleData = await this.localState.getGeneratedModule(moduleId);
    return {
      moduleManifest: moduleData.manifest,
      sourceCode: moduleData.code,
      documentation: moduleData.docs,
      testCases: moduleData.tests,
      contributionTemplate: this.generateGitHubPRTemplate(moduleData),
    };
  }
}
```

## Performance & Optimization

### Lazy Module Loading

```typescript
export class ModuleLoader {
  private loadedModules = new Map<string, GameModule>();

  public async loadModuleOnDemand(moduleId: string): Promise<GameModule> {
    if (this.loadedModules.has(moduleId)) {
      return this.loadedModules.get(moduleId)!;
    }

    const moduleManifest = await this.loadManifest(moduleId);
    const module = await this.instantiateModule(moduleManifest);

    this.loadedModules.set(moduleId, module);
    return module;
  }

  public async unloadUnusedModules(): Promise<void> {
    // Memory management for large module collections
    const activeModuleIds = this.getActiveModuleIds();
    for (const [moduleId, module] of this.loadedModules) {
      if (!activeModuleIds.includes(moduleId)) {
        await module.dispose();
        this.loadedModules.delete(moduleId);
      }
    }
  }
}
```

This technical architecture ensures maximum extensibility, security, and community collaboration while maintaining the narrative-driven experience that makes CODESCAPE unique.
