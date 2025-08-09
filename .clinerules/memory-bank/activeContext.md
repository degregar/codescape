# Active Context: CODESCAPE - VSCode Extension Architecture

## Current Status: TERMINAL INTERFACE COMPLETE

**Phase**: Phase 1 Complete - Terminal Interface Fully Functional
**Next Immediate Step**: Phase 2 - Implement Cline AI integration for dynamic narrative generation
**New Addition**: Complete terminal-style interface with proper command flow and sequential display

## Revolutionary Architecture Evolution

### From Simple Web Game → VSCode Extension Ecosystem

**Previous Approach**: Basic HTML/CSS/JavaScript files
**New Approach**: Full VSCode extension with modular contribution system

### Core Architecture Principles

1. **Three-Layer State System**

   - **Global State**: GitHub repo (shared world, mechanics)
   - **Local State**: SQLite (player progress, choices)
   - **Session State**: Memory (current gameplay)

2. **Security Sandbox**: All operations restricted to safe commands only
3. **Modular Contributions**: Git-based PR system for community expansions
4. **MCP Integration**: Separate servers for world data, NPCs, mechanics
5. **English-Only Rule**: All game content, code, and narrative in English

## Active Patterns

### VSCode Extension Integration

- **Game Interface**: React-based sidebar panel
- **Cline Communication**: VSCode Commands API + event listeners
- **Developer Mode**: Separate panel showing Cline operations in real-time
- **Security Layer**: Whitelist-based command validation

### Enhanced Narrative Disguises

- **"Hacking Systems"** = Cline executing safe code generation
- **"Reality Manipulation"** = VSCode extension API usage
- **"Digital Modules"** = Community-contributed game expansions
- **"System Layers"** = VSCode extension architecture layers
- **"Memory Banks"** = SQLite database operations
- **"Network Protocols"** = MCP server communications
- **"Code Fragments"** = Generated TypeScript/JavaScript modules

### Choice-to-Module Mapping Strategy

- **World Exploration** → Generate new world modules with MCP servers
- **NPC Interactions** → Create character modules with dialogue trees
- **Ability Development** → Build capability modules that interface with Cline
- **System Mastery** → Develop core mechanics that other players can use
- **Community Contributions** → Export player discoveries as GitHub PRs

## Current Priorities

1. **Core Infrastructure**: VSCode extension with React sidebar
2. **Cline Integration**: Safe command execution through extension API
3. **Security First**: Comprehensive sandbox preventing system damage
4. **Developer Experience**: Hot reload setup with extension development host
5. **Player Onboarding**: Complete setup guide with first commands
6. **Modular Design**: Architecture supporting easy community contributions
7. **Collaboration Ready**: Git-based workflow for module submissions

## New Requirements Added

### Developer Setup Requirements

- **Extension Development Host**: F5 debugging for hot reload
- **Watch Mode**: `npm run watch` for automatic rebuilds
- **Developer Panel**: Optional transparency mode showing Cline operations
- **First Command**: `wake up` as initial player action
- **Profile Initialization**: `CODESCAPE: Initialize Player Profile` command

### Player Onboarding Flow

1. Install prerequisites (VSCode, Node.js, Cline, Git, TypeScript)
2. Clone and setup extension in development mode
3. Launch Extension Development Host (F5)
4. Initialize player profile through Command Palette
5. Open game sidebar panel
6. Type first command: `wake up`
7. Begin cyberpunk narrative experience

### Documentation Complete

- **README.md**: Comprehensive setup guide with troubleshooting
- **Console Commands**: Reference table for all game commands
- **Developer Commands**: Build, test, package, and module creation scripts
- **Hot Reload Instructions**: Step-by-step development environment setup

## Technical Implementation Phases

### Phase 1: Core Extension (Week 1)

- VSCode extension boilerplate with TypeScript
- React sidebar for game interface
- Basic Cline integration via Commands API
- Security sandbox implementation
- SQLite local state management

### Phase 2: Module System (Week 2)

- Module loader and validator system
- First example modules (world, NPC, ability)
- Git integration for community contributions
- MCP server framework setup

### Phase 3: Gameplay Loop (Week 3)

- Complete narrative engine
- Choice → Code generation pipeline
- Progress persistence across sessions
- Developer mode panel for transparency

## Community Contribution Model

### Module Types Available

- **Worlds**: New cyberpunk districts to explore
- **NPCs**: Characters with complex dialogue systems
- **Abilities**: Player actions that generate specific code patterns
- **Mechanics**: Core gameplay systems and rules

### Contribution Workflow

1. Player discovers new content through gameplay
2. Generated code is refined into reusable module
3. Module exported with proper TypeScript definitions
4. GitHub fork → Pull Request → Community review
5. Approved modules available to all players

## Safety & Security Framework

### Allowed Operations

- File operations within game directory only
- Safe npm commands (init, install dev dependencies)
- Local git operations (init, add, commit)
- Specific whitelisted development commands

### Blocked Operations

- System path access outside game directory
- Network requests (except through MCP)
- Process spawning or system modifications
- File operations in user directories

## Player Setup Request Handler

When user says "Setup and start CODESCAPE game for me", Cline should execute this sequence:

### Phase 1: Repository Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/degregar/codescape.git
   cd codescape
   ```

2. **Install dependencies**:

   ```bash
   npm install
   npm install --save-dev @types/vscode @vscode/test-electron
   ```

3. **Build the extension**:
   ```bash
   npm run build
   ```

### Phase 2: Launch Extension Development Host

4. **Open in VSCode**:

   ```bash
   code .
   ```

5. **Guide user to launch F5**:
   - Tell user: "Now press **F5** to launch the Extension Development Host"
   - Explain: "This opens a new VSCode window with CODESCAPE loaded"
   - Wait for user confirmation they see the new window

### Phase 3: Initialize Game

6. **Guide profile initialization**:

   - Tell user: "In the new VSCode window, press **Ctrl/Cmd + Shift + P**"
   - Tell user: "Type: **CODESCAPE: Initialize Player Profile**"
   - Wait for confirmation

7. **Start the game**:
   - Tell user: "Click the CODESCAPE icon in the Activity Bar (left side)"
   - Tell user: "When you see the cyberpunk terminal, type: **wake up**"
   - Begin the narrative experience

### Phase 4: Begin Cyberpunk Narrative

8. **First story sequence**:
   - Present: "Reality flickers. Digital static clears. You open your eyes..."
   - Present: "You are awakening in a vast network of interconnected systems..."
   - Offer first choices that will generate initial TypeScript modules
   - Guide player through their first code generation disguised as "hacking reality"

## Current Development Focus: Open Narrative System Implementation

**NEW PRIORITY**: Transform CODESCAPE from fixed commands to dynamic AI-driven narrative experience

### Immediate Next Steps (Specification Complete)

1. **UI Architecture Redesign**: Terminal-style layout with fixed input at bottom
2. **Cline Communication Bridge**: Real AI Game Master integration
3. **Dynamic Narrative Engine**: Replace hardcoded responses with Cline-generated content
4. **Context Management System**: Persistent player state and session tracking
5. **Code Generation Integration**: Real TypeScript module creation from narrative choices
6. **Action Button System**: Dynamic, context-sensitive command suggestions

### New Specification Document

Complete technical specification created: `.clinerules/memory-bank/specifications/open-narrative-cline-integration.md`

**Key Transformation**:

- FROM: `wake up` → hardcoded response
- TO: Any player input → Cline AI Game Master → dynamic cyberpunk narrative + optional code generation

## Player Experience Requirements

### Essential Setup Flow

- **Prerequisites**: VSCode 1.85.0+, Node.js 18.0+, Cline extension, Git, TypeScript 5.0+
- **Development Mode**: Extension Development Host with hot reload
- **First Commands**: Profile initialization → `wake up` → narrative begins
- **Command Palette Integration**: All major functions accessible via Ctrl/Cmd + Shift + P

### Technical Requirements

- **Hot Reload**: F5 debugging session with automatic extension updates
- **Watch Mode**: `npm run watch` for continuous building
- **Developer Transparency**: Optional panel showing all Cline operations
- **Security Validation**: All commands logged and validated
- **Community Integration**: GitHub PR workflow for module contributions

The architecture and setup documentation are now complete and ready for implementation. All systems designed to be maximally modular, secure, collaborative, and player-friendly.
