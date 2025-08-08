# Contributing to CODESCAPE

We welcome contributions to CODESCAPE! This document outlines the guidelines for contributing to this project and the terms of use.

## 🚨 Important License Notice

**CODESCAPE is licensed under MIT License with Commons Clause Restriction.**

### Non-Commercial Use Only

- ✅ **Allowed**: Personal use, learning, research, open-source contributions
- ✅ **Allowed**: Educational use in schools, universities, coding bootcamps
- ✅ **Allowed**: Contributing modules, improvements, and bug fixes
- ❌ **Prohibited**: Selling the software or derivative works
- ❌ **Prohibited**: Using in paid services without written permission
- ❌ **Prohibited**: Commercial distribution or monetization

### Commercial Use Permission

If you wish to use CODESCAPE for commercial purposes, you must obtain prior written consent from the copyright holder:

**Contact**: Michał Kukla <michal@kukla.tech>

## 🤝 How to Contribute

### Types of Contributions Welcome

1. **Game Modules**: New cyberpunk districts, NPCs, abilities, mechanics
2. **Bug Fixes**: Security patches, performance improvements, bug reports
3. **Documentation**: Setup guides, tutorials, API documentation
4. **Testing**: Extension testing, module validation, security audits
5. **Translations**: Interface translations (following English-only content rule)

### Module Contribution Process

#### 1. Fork and Setup

```bash
git clone https://github.com/your-username/codescape.git
cd codescape
npm install
npm run build
```

#### 2. Create Your Module

```bash
# Generate module template
npm run create-module your-module-name

# Follow the cyberpunk narrative guidelines
# Ensure all content is in English
# Maintain security sandbox compliance
```

#### 3. Validate Your Module

```bash
# Run security validation
npm run validate-module modules/your-module

# Run tests
npm test

# Check TypeScript compliance
npm run type-check
```

#### 4. Submit Pull Request

- **Fork the repository**
- **Create feature branch**: `git checkout -b feature/your-module`
- **Commit changes**: `git commit -m "feat: add cyberpunk district module"`
- **Push to branch**: `git push origin feature/your-module`
- **Open Pull Request** with detailed description

### Module Guidelines

#### Content Requirements

- **English Only**: All text, comments, and documentation must be in English
- **Cyberpunk Theme**: Maintain narrative consistency with Matrix/cyberpunk aesthetic
- **Security First**: All modules must pass security validation
- **TypeScript**: Strict typing required for all code

#### Module Structure

```
modules/your-module/
├── manifest.json          # Module metadata
├── module.ts              # Main module code
├── README.md              # Module documentation
├── tests/                 # Module test suite
└── mcp-server/           # Optional MCP server
    ├── server.ts
    └── package.json
```

#### Security Requirements

- **Sandbox Compliance**: Only whitelisted operations allowed
- **Path Restrictions**: File operations within module directory only
- **No System Access**: No direct system or network access
- **Validation Required**: Must pass all security checks

### Code Standards

#### TypeScript Requirements

```typescript
// Strict typing required
interface YourModuleInterface {
  id: string;
  name: string;
  version: string;
  type: "world" | "npc" | "ability" | "mechanic";
}

// English-only content
const narrativeText = "The neon-lit streets stretch into digital infinity...";

// Security-compliant operations only
const allowedPath = "./modules/your-module/data.json";
```

#### Commit Message Format

```
feat: add new cyberpunk district module
fix: resolve security validation issue
docs: update module development guide
test: add validation tests for NPC modules
```

### Community Standards

#### Code of Conduct

- **Respectful Communication**: Professional and constructive feedback
- **Collaborative Spirit**: Help other contributors learn and improve
- **Quality Focus**: Maintain high standards for code and content
- **Security Awareness**: Report security issues responsibly

#### Review Process

1. **Automated Checks**: Security validation, type checking, testing
2. **Community Review**: Peer review for quality and narrative consistency
3. **Maintainer Approval**: Final approval from project maintainers
4. **Merge and Release**: Integration into main codebase

### Development Setup

#### Prerequisites

- VSCode 1.85.0+
- Node.js 18.0+
- TypeScript 5.0+
- Git
- Cline extension

#### Development Environment

```bash
# Install dependencies
npm install --save-dev @types/vscode @vscode/test-electron

# Start development server
npm run watch

# Launch extension development host
# Press F5 in VSCode

# Test your changes
npm test
```

### Getting Help

#### Resources

- **Documentation**: Complete setup and development guides
- **GitHub Issues**: Bug reports and feature requests
- **Community Discord**: Real-time help and collaboration
- **Email Support**: Direct contact for complex issues

#### Common Issues

- **Extension not loading**: Check Extension Development Host setup
- **Module validation errors**: Review security compliance
- **Hot reload not working**: Verify F5 debugging session
- **TypeScript errors**: Ensure strict typing compliance

## 📋 Contributor License Agreement

By contributing to CODESCAPE, you agree that:

1. **Your contributions are your original work** or you have rights to contribute
2. **You grant rights to use your contributions** under the project license
3. **You understand the non-commercial restriction** applies to all contributions
4. **You will not introduce commercial elements** without written permission
5. **You comply with all security and quality requirements**

## 🛡️ Security Policy

### Reporting Security Issues

If you discover security vulnerabilities:

1. **Do NOT open public issues** for security problems
2. **Email directly**: michal@kukla.tech with subject "CODESCAPE Security"
3. **Include detailed description** of the vulnerability
4. **Provide steps to reproduce** if possible
5. **Allow reasonable time** for response and fixes

### Security Requirements for Contributors

- **Follow sandbox restrictions** - no system access outside game directory
- **Validate all user inputs** - prevent code injection and malicious content
- **Use whitelisted operations** only - no unauthorized network or system calls
- **Test security compliance** - run validation tools before submitting

## 🎯 Project Goals

CODESCAPE aims to create:

- **Educational Gaming Experience**: Learn development through cyberpunk narrative
- **Community-Driven Content**: Collaborative world-building through code contributions
- **Professional Code Quality**: Production-ready TypeScript modules
- **Secure Environment**: Comprehensive sandbox preventing system damage
- **Open Source Innovation**: Advance game-based learning methodologies

## ⚖️ License Summary

**Remember**: CODESCAPE is free for non-commercial use. Commercial use requires written permission from the copyright holder.

For questions about licensing, contributions, or commercial use, contact:
**Michał Kukla** <michal@kukla.tech>

---

**Thank you for contributing to CODESCAPE!** 🌐🚀

Together we're building the future of narrative-driven software development education.
