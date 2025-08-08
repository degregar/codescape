# System Patterns: CODESCAPE - VSCode Extension Architecture

## Core Architecture Philosophy

CODESCAPE follows a **modular extension architecture** where narrative choices drive the creation of reusable community-contributed modules. The system emphasizes security, collaboration, and progressive complexity through VSCode's extension ecosystem.

## Primary Design Patterns

### 1. VSCode Extension Architecture

```
┌─────────────────────────────────────┐
│           VSCode Extension          │
├─────────────────────────────────────┤
│  React Sidebar │  Command Palette   │
│  Game Interface│  Cline Integration  │
├─────────────────────────────────────┤
│        Security Sandbox             │
│     (Whitelisted Operations)        │
├─────────────────────────────────────┤
│  Module System │  MCP Servers       │
│  (Community)   │  (Data Sources)    │
└─────────────────────────────────────┘
```

### 2. Three-Layer State Management

```
┌─────────────────────┐
│   GLOBAL STATE      │ → GitHub repo (shared modules)
├─────────────────────┤
│   LOCAL STATE       │ → SQLite (player progress)
├─────────────────────┤
│   SESSION STATE     │ → Memory (active gameplay)
└─────────────────────┘
```

### 3. Module System Architecture

```
modules/
├── worlds/          # World expansion modules
│   └── cyberpunk-downtown/
│       ├── manifest.json
│       ├── world.ts
│       └── mcp-server/
├── npcs/           # Character modules
├── abilities/      # Player capability modules
└── mechanics/      # Core gameplay systems
```

## Technical Implementation Patterns

### Extension Structure

```
src/
├── extension.ts              # VSCode extension entry point
├── game-engine/
│   ├── GameController.ts     # Main game orchestration
│   ├── ClineInterface.ts     # Cline communication layer
│   ├── SecuritySandbox.ts    # Command validation
│   └── ModuleLoader.ts       # Dynamic module system
├── ui/
│   ├── sidebar/              # React game interface
│   │   ├── GamePanel.tsx
│   │   └── DevPanel.tsx
│   └── webview/              # VSCode webview provider
└── mcp-servers/              # Model Context Protocol servers
    ├── world-data/
    ├── npc-dialogue/
    └── game-mechanics/
```

### Security Sandbox Pattern

```typescript
class SecuritySandbox {
  private allowedCommands = [
    /^touch /,
    /^mkdir /,
    /^echo /,
    /^npm init/,
    /^npm install --save-dev/,
    /^git init/,
    /^git add/,
    /^git commit/,
  ];

  private allowedPaths = ["./modules/", "./player-data/", "./generated-code/"];

  validate(command: string, path: string): boolean {
    return this.isCommandAllowed(command) && this.isPathSafe(path);
  }
}
```

### Module Definition Pattern

```typescript
interface GameModule {
  manifest: ModuleManifest;
  initialize(): Promise<void>;
  getActions(): Action[];
  onPlayerChoice(choice: string): Promise<ModuleResult>;
}

interface ModuleManifest {
  id: string;
  name: string;
  version: string;
  type: "world" | "npc" | "ability" | "mechanic";
  dependencies: string[];
  mcpServers?: string[];
  sandbox: SecurityRules;
}
```

## Integration Patterns

### Narrative-Module Mapping

- **"Explore new district"** → Load world module with MCP server
- **"Meet mysterious figure"** → Initialize NPC module with dialogue tree
- **"Develop new ability"** → Create capability module interfacing with Cline
- **"Hack security system"** → Generate mechanic module with safe code execution
- **"Share discovery"** → Export module for community contribution

### MCP Server Communication

```typescript
class WorldDataServer implements MCPServer {
  async getLocationData(locationId: string): Promise<LocationData> {
    return {
      description: "Neon-lit streets stretch into digital infinity...",
      availableActions: ["scan_area", "interact_terminal", "talk_npc"],
      hiddenElements: ["secret_door", "data_cache"],
      nextModules: ["underground-network", "corpo-tower"],
    };
  }
}
```

### Community Contribution Workflow

```
Player Gameplay → Generated Code → Module Export → GitHub PR → Review → Merge
```

1. Player makes choices that generate TypeScript modules
2. Code is refined and packaged with proper manifest
3. Module exported to Git with contribution template
4. Community reviews for quality, security, and narrative fit
5. Approved modules become available to all players

## Quality Assurance Patterns

### Module Validation Pipeline

```typescript
class ModuleValidator {
  validate(module: GameModule): ValidationResult {
    return {
      security: this.validateSecurity(module),
      quality: this.validateCode(module),
      narrative: this.validateStoryFit(module),
      integration: this.validateDependencies(module),
    };
  }
}
```

### Progressive Complexity Management

- **Level 1**: Simple choice modules (basic TypeScript)
- **Level 2**: Interactive modules (React components)
- **Level 3**: System modules (architectural patterns)
- **Level 4**: Meta modules (tool creation capabilities)
- **Level 5**: Community modules (collaborative development)

### English-Only Enforcement

```typescript
class LanguageValidator {
  validateContent(content: string): boolean {
    // Ensure all code comments, strings, and documentation in English
    return this.isEnglishOnly(content);
  }
}
```

## Collaboration Patterns

### Git-Based Module System

```yaml
# .github/workflows/validate-module.yml
name: Module Validation
on: [pull_request]
jobs:
  validate:
    steps:
      - name: Security Check
        run: npm run validate:security
      - name: Code Quality
        run: npm run validate:quality
      - name: Narrative Consistency
        run: npm run validate:narrative
```

### Developer Experience Integration

- **Transparent Operation**: Dev panel shows all Cline operations
- **Module Development**: Tools for creating and testing modules
- **Community Dashboard**: Interface for managing contributions
- **Safety Guarantees**: All operations clearly sandboxed and validated

This architecture ensures maximum modularity, security, and community collaboration while maintaining narrative immersion and technical quality.
