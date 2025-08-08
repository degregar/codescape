# CODESCAPE - Technical Architecture Documentation

## Project Overview

CODESCAPE is a revolutionary VSCode extension that presents itself as a cyberpunk narrative RPG while secretly guiding players through collaborative software development. Players make story choices that generate real TypeScript modules, which are then refined and contributed back to the community through GitHub PRs.

## Core Architecture

### Three-Layer State System

```
┌─────────────────────────────────────┐
│           GLOBAL STATE              │ → GitHub Repository
│     (Shared World & Modules)        │   - Community modules
├─────────────────────────────────────┤   - World definitions
│           LOCAL STATE               │ → SQLite Database
│      (Player Progress)              │   - Player choices
├─────────────────────────────────────┤   - Unlocked abilities
│          SESSION STATE              │ → Runtime Memory
│       (Active Gameplay)             │   - Current narrative
└─────────────────────────────────────┘   - Pending operations
```

### Extension Structure

```
codescape/
├── package.json                     # VSCode extension manifest
├── src/
│   ├── extension.ts                 # Extension entry point
│   ├── game-engine/
│   │   ├── GameController.ts        # Main orchestration
│   │   ├── ClineInterface.ts        # Cline communication
│   │   ├── SecuritySandbox.ts       # Command validation
│   │   ├── ModuleLoader.ts          # Dynamic module system
│   │   └── StateManager.ts          # Three-layer persistence
│   ├── ui/
│   │   ├── webview/                 # VSCode webview providers
│   │   └── sidebar/                 # React game interface
│   │       ├── GamePanel.tsx        # Main game UI
│   │       ├── DevPanel.tsx         # Developer transparency
│   │       └── ModuleManager.tsx    # Community modules
│   └── types/                       # TypeScript definitions
├── modules/                         # Community contributions
│   ├── worlds/                      # Game world expansions
│   ├── npcs/                        # Character modules
│   ├── abilities/                   # Player capability modules
│   └── mechanics/                   # Core gameplay systems
├── mcp-servers/                     # Model Context Protocol servers
│   ├── world-data/                  # Location and environment data
│   ├── npc-dialogue/                # Character interaction system
│   └── game-mechanics/              # Rules and progression logic
└── player-data/                     # Local state (gitignored)
    ├── progress.db                  # SQLite player database
    └── generated-code/              # Player's created modules
```

## Security Framework

### Sandbox Architecture

All player actions are filtered through a comprehensive security layer:

```typescript
export class SecuritySandbox {
  private readonly ALLOWED_COMMANDS = [
    // Safe file operations (restricted paths only)
    /^touch \.\/modules\/.+\.ts$/,
    /^mkdir \.\/player-data\/[a-zA-Z0-9-_]+$/,
    /^echo .+ > \.\/generated-code\/.+\.ts$/,

    // Safe package operations
    /^npm init --yes$/,
    /^npm install --save-dev @types\/.+$/,

    // Local git operations only
    /^git init$/,
    /^git add \.\/modules\/.+$/,
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
    /^\/System/,
    /^\/Applications/,
  ];

  public validateCommand(command: string): SecurityResult {
    return {
      allowed: this.isCommandSafe(command),
      sanitized: this.sanitizeCommand(command),
      reason: this.getSecurityReason(command),
    };
  }
}
```

### Module Validation Pipeline

Every community contribution undergoes automatic validation:

1. **Security Check**: No dangerous operations or system access
2. **Code Quality**: TypeScript compilation and linting
3. **Narrative Consistency**: Fits cyberpunk theme and story
4. **Integration Test**: Works with existing modules
5. **English Language**: All content in English only

## Module System

### Module Interface

```typescript
export interface GameModule {
  manifest: ModuleManifest;
  initialize(context: GameContext): Promise<void>;
  getAvailableActions(): Action[];
  executeAction(actionId: string, params: any): Promise<ActionResult>;
  onPlayerChoice(choice: PlayerChoice): Promise<ChoiceResult>;
  dispose(): Promise<void>;
}

export interface ModuleManifest {
  id: string; // unique identifier
  name: string; // display name
  version: string; // semantic version
  author: string; // contributor GitHub handle
  type: "world" | "npc" | "ability" | "mechanic";
  dependencies: string[]; // required modules
  mcpServers?: string[]; // external data sources
  permissions: SecurityPermission[]; // required capabilities
  entryPoint: string; // main module file
}
```

### Community Contribution Workflow

```mermaid
graph LR
    A[Player Choice] --> B[Code Generated]
    B --> C[Module Refined]
    C --> D[GitHub Fork]
    D --> E[Pull Request]
    E --> F[Community Review]
    F --> G[Validation Pipeline]
    G --> H[Merge to Main]
    H --> I[Available to All]
```

## MCP Server Network

### World Data Server

Manages all location-based content and environmental interactions:

```typescript
export class WorldDataServer implements MCPServer {
  async getLocation(locationId: string): Promise<LocationData> {
    return {
      id: locationId,
      name: "Neon District",
      description: "Rain-slicked streets reflect holographic advertisements...",
      atmosphere: "cyberpunk-noir",
      availableActions: [
        {
          id: "scan_area",
          name: "Scan environment",
          clineAction: "generate-scanner",
        },
        {
          id: "hack_terminal",
          name: "Access terminal",
          clineAction: "create-interface",
        },
      ],
      hiddenElements: ["secret_door", "data_cache"],
      requiredAbilities: ["basic_hacking", "street_knowledge"],
      connectedLocations: ["underground_network", "corpo_tower"],
    };
  }
}
```

### NPC Dialogue Server

Handles all character interactions and relationship systems:

```typescript
export class NPCDialogueServer implements MCPServer {
  async getDialogue(
    npcId: string,
    state: ConversationState
  ): Promise<DialogueNode> {
    return {
      npcId: "mysterious_contact",
      text: "The figure's cybernetic eyes gleam in the neon light...",
      mood: "cautious",
      responses: [
        {
          text: "I need access to the corporate networks",
          consequences: ["reputation_increase", "unlock_corp_module"],
          clineAction: "generate-corporate-interface",
        },
        {
          text: "Tell me about the security breach",
          consequences: ["info_unlock", "danger_increase"],
          clineAction: "create-security-analysis",
        },
      ],
    };
  }
}
```

## Narrative-Technical Mapping

### Core Translation Layer

Every narrative element corresponds to technical implementation:

| Narrative Element        | Technical Reality                          |
| ------------------------ | ------------------------------------------ |
| "Hacking a system"       | Generating TypeScript functions with Cline |
| "Exploring new district" | Loading world module with MCP server       |
| "Meeting contact"        | Initializing NPC module with dialogue tree |
| "Developing abilities"   | Creating capability modules                |
| "Sharing discoveries"    | Contributing modules via GitHub PR         |
| "Digital artifacts"      | Data structures and objects                |
| "Memory banks"           | SQLite database operations                 |
| "Network protocols"      | MCP server communications                  |

### Choice-Consequence System

```typescript
interface PlayerChoice {
  id: string;
  narrative: string; // What player sees
  technicalAction: string; // What actually happens
  clineCommands: ClineCommand[]; // Generated operations
  moduleUpdates: ModuleUpdate[]; // System changes
  storyProgression: StoryFlag[]; // Narrative advancement
  communityImpact: ContributionData; // Potential PR data
}
```

## Development Phases

### Phase 1: Core Extension (Week 1)

- ✅ VSCode extension boilerplate with TypeScript
- ✅ React sidebar for game interface with cyberpunk theming
- ✅ Basic Cline integration via Commands API
- ✅ Security sandbox implementation with whitelisting
- ✅ SQLite local state management and schemas

### Phase 2: Module System (Week 2)

- 🔧 Module loader and validator system
- 🔧 First example modules (world, NPC, ability)
- 🔧 Git integration for community contributions
- 🔧 MCP server framework setup and configuration

### Phase 3: Gameplay Loop (Week 3)

- 🔧 Complete narrative engine with choice mapping
- 🔧 Choice → Code generation pipeline
- 🔧 Progress persistence across sessions
- 🔧 Developer mode panel for operation transparency

### Phase 4: Community Features (Week 4)

- 🔧 Module contribution interface
- 🔧 Community module browser and installer
- 🔧 GitHub integration for PR workflow
- 🔧 Quality assurance and review system

## Quality Assurance

### Automated Validation

```yaml
# .github/workflows/validate-module.yml
name: Module Validation Pipeline
on: [pull_request]
jobs:
  security-check:
    steps:
      - name: Security Scan
        run: npm run validate:security
  code-quality:
    steps:
      - name: TypeScript Check
        run: tsc --noEmit
      - name: ESLint
        run: eslint src/ modules/
  narrative-consistency:
    steps:
      - name: Theme Validation
        run: npm run validate:cyberpunk-theme
      - name: English Language Check
        run: npm run validate:english-only
  integration-test:
    steps:
      - name: Module Loading Test
        run: npm run test:module-loading
      - name: MCP Server Test
        run: npm run test:mcp-integration
```

### Manual Review Criteria

1. **Security**: No system access outside game directory
2. **Quality**: Clean TypeScript with proper types
3. **Theme**: Maintains cyberpunk narrative consistency
4. **Integration**: Works seamlessly with existing modules
5. **Documentation**: Clear README and code comments
6. **Language**: All content strictly in English

## Performance Optimization

### Lazy Loading Strategy

- Modules loaded only when accessed by narrative
- MCP servers initialized on-demand
- UI components rendered progressively
- Database queries optimized for player progress tracking

### Memory Management

- Unused modules automatically unloaded
- Session state cleared between gameplay sessions
- SQLite connections properly managed
- React components use proper cleanup

## Installation & Setup

### Prerequisites

- VSCode 1.85.0 or higher
- Node.js 18.0 or higher
- Git for community contributions
- TypeScript 5.0+ for module development

### Installation Steps

1. Install extension from VSCode marketplace
2. Initialize player profile on first run
3. Download core world modules
4. Begin narrative experience

### Developer Setup

1. Clone repository: `git clone https://github.com/codescape/extension`
2. Install dependencies: `npm install`
3. Build extension: `npm run build`
4. Load in VSCode: F5 to launch extension development host

## Community Guidelines

### Module Contribution Standards

- All code must be TypeScript with strict typing
- Follow established cyberpunk narrative themes
- Include comprehensive tests for functionality
- Provide clear documentation in English
- Respect security boundaries and sandbox restrictions

### Review Process

1. Fork repository and create feature branch
2. Develop module following contribution guidelines
3. Submit pull request with detailed description
4. Automated validation pipeline runs checks
5. Community reviewers assess quality and fit
6. Maintainers merge approved contributions

## Future Roadmap

### Enhanced Features

- **Multi-player Collaboration**: Shared world states across teams
- **Advanced AI Integration**: Dynamic NPC behavior and responses
- **Visual Extensions**: Rich media content in narrative panels
- **Custom World Builder**: Tools for creating entirely new game worlds
- **Integration APIs**: Connect with other development tools

### Community Expansion

- **Module Marketplace**: Curated collection of high-quality modules
- **Creator Tools**: Enhanced development environment for contributors
- **Achievement System**: Recognition for outstanding contributions
- **Mentorship Program**: Experienced developers help newcomers

## Conclusion

CODESCAPE represents a revolutionary approach to developer education and community collaboration. By disguising sophisticated software development as engaging narrative gameplay, it creates a unique experience where learning and contributing feel like natural exploration and discovery.

The modular architecture ensures the system can grow organically with its community, while comprehensive security measures protect users and their systems. The result is a game that teaches advanced development practices while producing real, valuable software contributions.

**Status**: Architecture Complete - Ready for Implementation 🚀
