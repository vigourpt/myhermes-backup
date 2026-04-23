// OpenClaw Guide - Sidebar Application Logic

(function() {
  'use strict';

  // DOM Elements
  const content = document.getElementById('content');
  const navItems = document.querySelectorAll('.nav-item');
  const contextBar = document.getElementById('contextBar');
  const currentPageSpan = document.getElementById('currentPage');
  const themeToggle = document.getElementById('themeToggle');
  const aiChatToggle = document.getElementById('aiChatToggle');
  const aiPanel = document.getElementById('aiPanel');
  const aiClose = document.getElementById('aiClose');
  const aiMessages = document.getElementById('aiMessages');
  const aiInput = document.getElementById('aiInput');
  const aiSend = document.getElementById('aiSend');

  // State
  let currentSection = 'overview';
  let darkMode = false;

  // Initialize
  function init() {
    loadSection('overview');
    setupEventListeners();
    detectOpenClawPage();
    loadThemePreference();
  }

  // Event Listeners
  function setupEventListeners() {
    // Navigation
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const section = item.dataset.section;
        setActiveNav(section);
        loadSection(section);
      });
    });

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // AI Chat toggle
    aiChatToggle.addEventListener('click', toggleAiPanel);
    aiClose.addEventListener('click', toggleAiPanel);
    aiSend.addEventListener('click', sendAiMessage);
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendAiMessage();
      }
    });
  }

  // Navigation
  function setActiveNav(section) {
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.section === section);
    });
    currentSection = section;
  }

  function loadSection(section) {
    const data = KNOWLEDGE_BASE[section];
    if (!data) {
      content.innerHTML = '<p>Section not found.</p>';
      return;
    }
    content.innerHTML = data.content;
    
    // Update page indicator
    currentPageSpan.textContent = data.title.replace(/^[^\s]+\s/, '');
  }

  // Detect which page of OpenClaw UI is open
  function detectOpenClawPage() {
    // Listen for messages from content script
    window.addEventListener('message', (event) => {
      if (event.data.type === 'OPENCLAW_PAGE') {
        const page = event.data.page;
        currentPageSpan.textContent = page;
        
        // Auto-navigate to relevant section
        const pageMap = {
          'chat': 'overview',
          'config': 'config',
          'channels': 'channels',
          'agents': 'agents',
          'sessions': 'sessions',
          'skills': 'skills',
          'cron': 'troubleshooting',
          'nodes': 'troubleshooting',
          'usage': 'models',
          'logs': 'troubleshooting'
        };
        
        if (pageMap[page]) {
          // Don't auto-navigate, just update indicator
        }
      }
    });
  }

  // Theme
  function loadThemePreference() {
    const saved = localStorage.getItem('openclaw-guide-theme');
    if (saved === 'dark') {
      darkMode = true;
      document.body.classList.add('dark');
      themeToggle.textContent = '☀️';
    }
  }

  function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark', darkMode);
    themeToggle.textContent = darkMode ? '☀️' : '🌙';
    localStorage.setItem('openclaw-guide-theme', darkMode ? 'dark' : 'light');
  }

  // AI Chat Panel
  function toggleAiPanel() {
    aiPanel.classList.toggle('hidden');
    if (!aiPanel.classList.contains('hidden') && aiMessages.children.length === 0) {
      addAiMessage('assistant', "Hi! I'm your OpenClaw AI assistant. Ask me anything about configuring OpenClaw, setting up channels, agents, skills, troubleshooting, or any other aspect of OpenClaw. I'm trained on the OpenClaw documentation and can help guide you through the setup process.");
    }
  }

  function addAiMessage(role, text) {
    const msg = document.createElement('div');
    msg.className = `ai-message ${role}`;
    msg.textContent = text;
    aiMessages.appendChild(msg);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  function sendAiMessage() {
    const text = aiInput.value.trim();
    if (!text) return;

    addAiMessage('user', text);
    aiInput.value = '';

    // Generate contextual response based on current section and question
    const response = generateAiResponse(text, currentSection);
    setTimeout(() => addAiMessage('assistant', response), 500);
  }

  function generateAiResponse(question, currentSection) {
    const q = question.toLowerCase();
    
    // Simple keyword-based responses
    // In production, this would call an AI API
    
    // Telegram related
    if (q.includes('telegram') || q.includes('bot')) {
      if (q.includes('setup') || q.includes('config') || q.includes('install')) {
        return "To set up Telegram:\n\n1. Message @BotFather on Telegram\n2. Send /newbot and follow prompts\n3. Copy your bot token\n4. In Control UI → Channels → Telegram, paste the token\n5. Set dmPolicy to 'pairing'\n6. Send a message to your bot\n7. You'll get a pairing code - approve with:\n   openclaw pairing approve telegram YOUR_CODE\n\nThe bot token looks like: 123456:ABC-DEF... ";
      }
      return "For Telegram help, the key setting is 'dmPolicy'. Set it to 'pairing' so new users get a pairing code. To approve them, use:\n\nopenclaw pairing approve telegram PAIRING_CODE";
    }

    // Channel related
    if (q.includes('channel')) {
      return "Channels are messaging platforms connected to OpenClaw. Key settings:\n\n• dmPolicy: How to handle DMs (pairing/allowlist/open/disabled)\n• allowFrom: List of allowed user IDs\n• groupPolicy: How to handle group messages\n\nSupported channels: Telegram, Discord, WhatsApp, Slack, Signal, iMessage, Google Chat, MS Teams, Matrix, and more.\n\nCheck the Channels section in this guide for detailed setup instructions.";
    }

    // Agent related
    if (q.includes('agent')) {
      return "OpenClaw supports multiple agents. Each has:\n\n• workspace: Files that define agent behavior (AGENTS.md, SOUL.md, etc.)\n• model: AI model to use\n• skills: What the agent can do\n• sandbox: Isolation settings\n\nDefault agent uses ~/.openclaw/workspace. You can create custom agents with different settings in agents.list[].";
    }

    // Config related
    if (q.includes('config') || q.includes('setting')) {
      return "The main config file is ~/.openclaw/openclaw.json (JSON5 format - comments allowed).\n\nKey sections:\n• agent: Primary model setting\n• channels: Messaging integrations\n• agents: Multi-agent config\n• gateway: Daemon settings\n• tools: Tool permissions\n• skills: Skill management\n\nIn Control UI, use the Config tab to edit. Toggle between Form mode (easy) and JSON mode (advanced).";
    }

    // Skills related
    if (q.includes('skill')) {
      return "Skills are SKILL.md files that teach the agent capabilities. They live in:\n\n• ~/.openclaw/workspace/skills/\n• ~/.openclaw/skills/\n• Bundled skills\n• Extra dirs in skills.load.extraDirs\n\nInstall from ClawHub: openclaw skills install <name>\n\nOr browse clawhub.ai for community skills.";
    }

    // Model related
    if (q.includes('model') || q.includes('api key')) {
      return "Set API keys in ~/.openclaw/.env:\n\nANTHROPIC_API_KEY=sk-ant...\nOPENAI_API_KEY=sk-...\n\nThen in config, set your model:\n\n{ agent: { model: \"anthropic/claude-sonnet-4-6\" } }\n\nYou can set fallback models as an array. The agent tries each in order until one works.";
    }

    // Sandbox related
    if (q.includes('sandbox') || q.includes('docker')) {
      return "Sandbox isolates agent sessions in Docker containers for safety.\n\nModes:\n• off: No sandboxing (not recommended)\n• non-main: Sandbox all except main session (recommended)\n• all: Sandbox everything\n\nRequirements:\n• Docker installed: sudo apt install docker.io\n• Docker running: sudo systemctl start docker\n• Your user in docker group: sudo usermod -aG docker $USER";
    }

    // Pairing related
    if (q.includes('pairing') || q.includes('approve')) {
      return "Pairing is how you approve new users.\n\nWhen dmPolicy is 'pairing', unknown users get a pairing code they need approved.\n\nCommands:\n• openclaw pairing list - See pending approvals\n• openclaw pairing approve <channel> <code> - Approve a user\n• openclaw pairing revoke <channel> <user_id> - Remove approval";
    }

    // Gateway related
    if (q.includes('gateway') || q.includes('port') || q.includes('daemon')) {
      return "The Gateway is the main daemon process. It runs on port 18789 by default.\n\nCommands:\n• openclaw gateway start\n• openclaw gateway stop\n• openclaw gateway restart\n• openclaw gateway status\n• openclaw gateway logs\n\nThe Control UI is at http://127.0.0.1:18789";
    }

    // Troubleshooting
    if (q.includes('not working') || q.includes('error') || q.includes('problem') || q.includes('issue')) {
      return "Common issues:\n\n• Gateway won't start: Check port 18789 isn't in use, validate config with 'openclaw config validate'\n\n• Channel not connecting: Verify bot token, check logs with 'openclaw gateway logs'\n\n• No AI response: Check API keys in ~/.openclaw/.env and agent.model in config\n\n• Pairing code not working: Use 'openclaw pairing list' to see pending codes\n\nCheck the Troubleshooting section for more detailed solutions.";
    }

    // Help / Getting started
    if (q.includes('help') || q.includes('start') || q.includes('begin') || q.includes('how do i')) {
      return "Quick start guide:\n\n1. Install: npm install -g openclaw@latest\n2. Setup: openclaw onboard --install-daemon\n3. Set API keys in ~/.openclaw/.env\n4. Start: openclaw gateway\n5. Open UI: http://127.0.0.1:18789\n6. Connect a channel (Telegram is easiest)\n7. Approve pairings with:\n   openclaw pairing approve telegram CODE\n\nNavigate using the sections in this guide panel for detailed help!";
    }

    // Default response - contextual based on current section
    return `I can help with that! You're currently viewing the "${KNOWLEDGE_BASE[currentSection]?.title || currentSection}" section of the guide.\n\nTry asking:\n• "How do I set up Telegram?"\n• "How do I add skills?"\n• "What is the pairing system?"\n• "How do I configure models?"\n• "How do I troubleshoot [issue]?"\n\nOr browse the sections in the left sidebar for step-by-step guidance.`;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
