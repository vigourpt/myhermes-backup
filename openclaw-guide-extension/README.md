# OpenClaw Setup Guide - Chrome Extension

A Chrome side panel extension that provides contextual guidance and AI-powered assistance for setting up and configuring OpenClaw.

## Features

- **Contextual Guide**: Comprehensive documentation for all OpenClaw settings and features
- **AI Assistant**: Ask questions about OpenClaw configuration and get instant answers
- **Page Detection**: Automatically detects which page of the OpenClaw Control UI you're on
- **Dark/Light Mode**: Toggle between themes
- **Searchable**: Navigate through sections covering Channels, Agents, Models, Skills, Tools, and more

## Sections Covered

1. **Overview** - What is OpenClaw, key terms and concepts
2. **Quick Start** - Installation and initial setup guide
3. **Architecture** - System architecture and how components work
4. **Config Editor** - How to use the config editor in Control UI
5. **Channels** - Setup guides for Telegram, Discord, WhatsApp, Slack, and more
6. **Agents** - Multi-agent configuration and workspace management
7. **Models** - AI model providers and API key configuration
8. **Skills** - Installing and managing skills from ClawHub
9. **Sessions** - Session management and DM scoping
10. **Tools** - Tool profiles and permission configuration
11. **Sandbox** - Docker sandbox setup for secure isolation
12. **Gateway** - Gateway daemon configuration
13. **Security** - Pairing system, authentication, and best practices
14. **Webhooks** - Setting up incoming webhooks
15. **Troubleshooting** - Common issues and solutions

## Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `openclaw-guide-extension` folder
5. The extension icon will appear in your Chrome toolbar

## Usage

1. Navigate to the OpenClaw Control UI at `http://127.0.0.1:18789`
2. Click the OpenClaw Guide icon in your Chrome toolbar (or right-click and choose "Open side panel")
3. The guide panel opens alongside the Control UI
4. Browse sections using the left sidebar navigation
5. Click the **🤖 Ask AI** button to ask questions about OpenClaw

## AI Assistant

The built-in AI assistant can help with:

- Setting up messaging channels (Telegram, Discord, etc.)
- Configuring agents and models
- Installing and managing skills
- Troubleshooting issues
- Understanding any OpenClaw feature

Simply type your question and get contextual guidance based on the OpenClaw documentation.

## Files

```
openclaw-guide-extension/
├── manifest.json           # Extension manifest
├── icons/                  # Extension icons
├── sidebar/                # Side panel HTML
│   └── index.html
├── scripts/
│   ├── sidebar.js          # Side panel logic
│   ├── content.js          # Content script (injected into OpenClaw UI)
│   ├── background.js      # Service worker
│   └── knowledge-base.js  # All OpenClaw documentation
├── styles/
│   ├── sidebar.css         # Side panel styles
│   └── content.css         # Content script styles
└── _locales/
    └── en/messages.json    # Localization
```

## Requirements

- Chrome browser (version 114+ for side panel API)
- OpenClaw running locally at `http://127.0.0.1:18789` (for page detection)

## Note

This extension is designed to work alongside the OpenClaw Control UI. It provides educational guidance but does not modify or control OpenClaw itself.
