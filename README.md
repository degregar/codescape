# 🌐 CODESCAPE - Cyberpunk Narrative VSCode Extension

**Experience a revolutionary cyberpunk RPG where your story choices secretly generate professional TypeScript modules that benefit the entire development community.**

[![VSCode Extension](https://img.shields.io/badge/VSCode-Extension-blue)](https://code.visualstudio.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Community Driven](https://img.shields.io/badge/Community-Driven-green)](https://github.com)
[![Security First](https://img.shields.io/badge/Security-First-red)](https://github.com)

## 🚀 Quick Start - Start Playing NOW!

**Want to begin your cyberpunk adventure immediately? Just tell Cline:**

```
Setup and start CODESCAPE game for me
```

**That's it!** Cline will handle everything - installation, setup, and launching your cyberpunk experience. You'll be awakening in the digital reality within minutes.

**Don't have Cline yet?** Install it from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=cline.cline) first, then use the command above.

---

## 🎮 What You'll Experience

### 🌆 Immersive Cyberpunk Adventure

- **Matrix-style digital reality** within VSCode
- **Compelling narrative choices** that drive story progression
- **Your choices secretly generate TypeScript modules** that help other developers
- **Community-created worlds** to explore and expand

### 🎯 Gameplay Flow

1. **Wake up** in a cyberpunk digital reality
2. **Make choices** using the game interface
3. **Watch the story unfold** as consequences emerge
4. **Unlock new abilities** and areas through progression
5. **Create modules** that other players discover and use
6. **Contribute to community** through GitHub integration

### 🔐 Security First

- **Comprehensive sandbox** prevents any system damage
- **Whitelisted operations** only - completely safe to play
- **All operations logged** and validated for transparency

---

## 🔧 Manual Setup (Advanced Users Only)

**⚠️ Most users don't need this section!** The simple command above handles everything automatically.

**This section is for developers who want to understand the internals or need to troubleshoot if something goes wrong with Cline's automatic setup.**

### Prerequisites (If Setting Up Manually)

- **VSCode 1.85.0+** - [Download here](https://code.visualstudio.com/)
- **Node.js 18.0+** - [Download here](https://nodejs.org/)
- **Cline Extension** - [Install from VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=cline.cline)
- **Git** - [Download here](https://git-scm.com/)
- **TypeScript 5.0+** - `npm install -g typescript`

### Manual Installation Steps

**Only follow these if Cline's automatic setup fails:**

1. **Clone CODESCAPE**:

   ```bash
   git clone https://github.com/degregar/codescape.git
   cd codescape
   npm install
   ```

2. **Open in VSCode**:

   ```bash
   code .
   ```

3. **Install Development Dependencies**:

   ```bash
   npm install --save-dev @types/vscode @vscode/test-electron
   npm run build
   ```

4. **Launch Extension Development Host**:

   - Press `F5` or go to Run > Start Debugging
   - This opens a new VSCode window with the extension loaded

5. **Initialize Your Profile**:

   - In the Extension Development Host window
   - Press `Ctrl/Cmd + Shift + P`
   - Type: `CODESCAPE: Initialize Player Profile`

6. **Begin Your Journey**:
   - Open the CODESCAPE Sidebar (Activity Bar on left)
   - When you see the cyberpunk terminal, type: `wake up`

### Development Commands

```bash
# Build the extension
npm run build

# Watch for changes (auto-rebuild)
npm run watch

# Run tests
npm test

# Package extension
npm run package

# Generate new module template
npm run create-module <module-name>

# Validate community module
npm run validate-module <path>
```

## 🎯 Game Features

### 🌆 Immersive Cyberpunk Experience

- **Matrix-style digital reality** within VSCode
- **Compelling narrative choices** that drive story progression
- **Progressive skill development** through gameplay
- **Community-created worlds** to explore

### 🔐 Security-First Architecture

- **Comprehensive sandbox** prevents system damage
- **Whitelisted operations** only
- **Safe module validation** for community contributions
- **Audit logging** of all operations

### 🤝 Community Collaboration

- **Module contribution system** via GitHub PRs
- **Peer review process** ensuring quality
- **Shared universe** that grows with player choices
- **Mentorship opportunities** for developers

### 🎨 Developer Transparency

- **Optional developer panel** showing Cline operations
- **Real-time code generation** visibility
- **Module creation process** transparency
- **Security validation** logging

## 📖 Gameplay Guide

### Basic Gameplay Loop

1. **Read the narrative** presented in the game panel
2. **Make choices** using the provided options
3. **Experience consequences** as the story unfolds
4. **Unlock new abilities** and areas through progression
5. **Create modules** that other players can discover
6. **Contribute to community** through GitHub integration

### Advanced Features

- **Module Development**: Create custom game modules
- **World Building**: Design new cyberpunk districts
- **NPC Creation**: Build interactive characters
- **Ability Systems**: Develop player capabilities
- **Community Review**: Help validate other contributions

## 🛠️ Troubleshooting

### Common Issues

**Extension Not Loading**:

```bash
# Reload the extension development host
# Press Ctrl/Cmd + Shift + P, then "Developer: Reload Window"
```

**Module Validation Errors**:

```bash
npm run validate-module modules/your-module
```

**Database Issues**:

```bash
# Reset player data (WARNING: Loses progress)
rm -rf player-data/progress.db
```

**Hot Reload Not Working**:

1. Ensure you're in the Extension Development Host window
2. Check that `npm run watch` is running
3. Verify F5 launched the debug session correctly

### Getting Help

- **GitHub Issues**: [Report bugs and feature requests](https://github.com/degregar/codescape/issues)
- **Community Discord**: [Join our community](https://discord.gg/codescape)
- **Documentation**: [Read the full docs](https://docs.codescape.dev)

## 🎮 Console Commands Reference

### Initial Commands

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `wake up`          | Begin your digital awakening   |
| `scan environment` | Analyze your surroundings      |
| `check abilities`  | View your current capabilities |

### Navigation Commands

| Command               | Description               |
| --------------------- | ------------------------- |
| `explore [direction]` | Move to new areas         |
| `enter [location]`    | Access specific locations |
| `return`              | Go back to previous area  |

### Interaction Commands

| Command            | Description              |
| ------------------ | ------------------------ |
| `talk to [npc]`    | Initiate dialogue        |
| `hack [system]`    | Attempt system access    |
| `analyze [object]` | Examine items or systems |

### Development Commands

| Command                | Description            |
| ---------------------- | ---------------------- |
| `show modules`         | List available modules |
| `create module [name]` | Generate new module    |
| `contribute [module]`  | Share with community   |

## 🏗️ Architecture Overview

CODESCAPE uses a revolutionary three-layer architecture:

- **Global State**: GitHub repository for shared modules
- **Local State**: SQLite database for player progress
- **Session State**: Runtime memory for active gameplay

### Technology Stack

- **TypeScript 5.0+** for type safety
- **React 18** for UI components
- **SQLite3** for local persistence
- **Model Context Protocol** for game data
- **VSCode Extension API** for native integration

## 🤝 Contributing

### Module Contribution Process

1. **Fork the repository**
2. **Create your module** following our guidelines
3. **Test thoroughly** using our validation tools
4. **Submit a pull request** with detailed description
5. **Engage with reviewers** for feedback
6. **Celebrate** when your module is merged!

### Development Guidelines

- **TypeScript required** with strict typing
- **English-only content** for all text
- **Cyberpunk theme consistency** maintained
- **Security boundaries** respected
- **Comprehensive testing** included

## 📋 Requirements Summary

### System Requirements

- VSCode 1.85.0+
- Node.js 18.0+
- Git for version control
- 4GB+ RAM for optimal performance
- Internet connection for community features

### Development Requirements

- Cline extension installed and configured
- Extension development host setup
- Hot reload configuration enabled
- TypeScript development environment
- Understanding of VSCode extension APIs

## 🎊 Ready to Begin?

Your cyberpunk journey awaits! Follow the setup steps above, type `wake up` in the terminal, and prepare to experience software development like never before.

**Remember**: Every choice you make shapes both the narrative and the code. Welcome to CODESCAPE.

## ⚖️ License & Usage

**CODESCAPE is licensed under MIT License with Commons Clause Restriction.**

### 🚨 Important: Non-Commercial Use Only

- ✅ **Allowed**: Personal use, learning, research, educational purposes
- ✅ **Allowed**: Contributing modules and improvements to the community
- ✅ **Allowed**: Forking for non-commercial projects and experimentation
- ❌ **Prohibited**: Selling the software or any derivative works
- ❌ **Prohibited**: Using in paid services or commercial applications
- ❌ **Prohibited**: Monetizing or charging fees for CODESCAPE usage

### Commercial Use Permission

If you wish to use CODESCAPE for commercial purposes, you must obtain **prior written consent** from the copyright holder:

**Contact**: Michał Kukla <michal@kukla.tech>

### Contributing Guidelines

By contributing to CODESCAPE, you agree to the terms outlined in [CONTRIBUTING.md](./CONTRIBUTING.md). All contributions must comply with the non-commercial restriction and security requirements.

---

**Status**: Ready for Adventure 🌐🚀

**Copyright © 2025 Michał Kukla** - Licensed under MIT with Commons Clause Restriction
