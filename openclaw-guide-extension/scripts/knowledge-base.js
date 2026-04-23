// OpenClaw Guide - Knowledge Base
// Comprehensive configuration and setup reference

const KNOWLEDGE_BASE = {
  
  overview: {
    title: "🏠 Overview",
    content: `
<h1>What is OpenClaw?</h1>
<p><strong>OpenClaw</strong> is a personal AI assistant that runs on your own devices and connects to messaging channels you already use.</p>

<h2>Core Components</h2>
<ul>
  <li><strong>Gateway</strong> - The central daemon (runs on port 18789) that owns all messaging channels and runs the AI agent</li>
  <li><strong>Control UI</strong> - Web dashboard at <code>http://127.0.0.1:18789</code> for configuration</li>
  <li><strong>CLI</strong> - Command-line tool: <code>openclaw gateway</code>, <code>openclaw onboard</code>, etc.</li>
  <li><strong>Skills</strong> - Markdown files (SKILL.md) that teach the agent how to use tools and follow workflows</li>
</ul>

<h2>Key Terms</h2>
<table>
  <tr><td><strong>Channel</strong></td><td>A messaging platform (Telegram, WhatsApp, Discord, etc.)</td></tr>
  <tr><td><strong>Agent</strong></td><td>An AI assistant instance with its own workspace, model, and permissions</td></tr>
  <tr><td><strong>Session</strong></td><td>A conversation context - messages route based on source</td></tr>
  <tr><td><strong>Workspace</strong></td><td>Directory (<code>~/.openclaw/workspace</code>) with agent instructions</td></tr>
  <tr><td><strong>Skill</strong></td><td>A SKILL.md file that teaches the agent a capability</td></tr>
  <tr><td><strong>Sandbox</strong></td><td>Isolated container (Docker) for running agent sessions safely</td></tr>
</table>

<h2>Quick Navigation</h2>
<p>The Control UI has these main tabs:</p>
<ul>
  <li><strong>Chat</strong> - Send messages to the agent</li>
  <li><strong>Config</strong> - Edit configuration (form or raw JSON)</li>
  <li><strong>Channels</strong> - Manage messaging integrations</li>
  <li><strong>Agents</strong> - Multi-agent management</li>
  <li><strong>Sessions</strong> - View conversation sessions</li>
  <li><strong>Skills</strong> - Browse and configure skills</li>
  <li><strong>Cron</strong> - Scheduled jobs</li>
  <li><strong>Nodes</strong> - Paired device management</li>
  <li><strong>Usage</strong> - Token/usage metrics</li>
  <li><strong>Logs</strong> - Gateway logs</li>
</ul>
`
  },

  quickstart: {
    title: "🚀 Quick Start Guide",
    content: `
<h1>Getting Started with OpenClaw</h1>

<h2>1. Installation</h2>
<pre><code>npm install -g openclaw@latest</code></pre>

<h2>2. Initial Setup</h2>
<pre><code>openclaw onboard --install-daemon</code></pre>
<p>This runs an interactive wizard that:</p>
<ul>
  <li>Creates your config file at <code>~/.openclaw/openclaw.json</code></li>
  <li>Asks for your AI API keys (OpenAI, Anthropic, etc.)</li>
  <li>Helps you configure your first channel (e.g., Telegram bot)</li>
  <li>Starts the gateway daemon</li>
</ul>

<h2>3. Set API Keys</h2>
<p>Create or edit <code>~/.openclaw/.env</code>:</p>
<pre><code>ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...</code></pre>

<h2>4. Start the Gateway</h2>
<pre><code>openclaw gateway --port 18789</code></pre>

<h2>5. Open Control UI</h2>
<p>Navigate to: <code>http://127.0.0.1:18789</code></p>

<h2>6. Connect a Channel (e.g., Telegram)</h2>
<ol>
  <li>Create a bot via <strong>@BotFather</strong> on Telegram</li>
  <li>Get your bot token</li>
  <li>In Control UI → Channels → Telegram, add the token</li>
  <li>Set <code>dmPolicy</code> to <code>pairing</code></li>
  <li>Send a message to your bot - you'll get a pairing code</li>
  <li>Approve with: <code>openclaw pairing approve telegram PAIRING_CODE</code></li>
</ol>

<h2>7. Add Skills</h2>
<pre><code>openclaw skills install &lt;skill-name&gt;</code></pre>
<p>Or browse and install from <strong>ClawHub</strong> at clawhub.ai</p>
`
  },

  architecture: {
    title: "🏗️ Architecture",
    content: `
<h1>OpenClaw Architecture</h1>

<h2>System Diagram</h2>
<pre>
┌─────────────────────────────────────────────────────┐
│                   OpenClaw Gateway                  │
│                  (port 18789)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Channel    │  │   Agent     │  │    Skill    │  │
│  │  Manager    │  │   Runtime   │  │   Loader    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
│         ↓                ↓                ↓        │
│  ┌─────────────────────────────────────────────────┐│
│  │              Tool Executor                      ││
│  │  exec | browser | read | write | message | ... ││
│  └─────────────────────────────────────────────────┘│
└──────────┬──────────────────┬───────────────────────┘
           │                  │
     ┌─────┴─────┐      ┌─────┴─────┐
     │  Telegram │      │  Discord  │
     │  WhatsApp │      │  Slack    │
     │  Signal   │      │  ...      │
     └───────────┘      └───────────┘
</pre>

<h2>Config File Location</h2>
<p><code>~/.openclaw/openclaw.json</code> (JSON5 format - comments allowed)</p>

<h2>Workspace Structure</h2>
<pre>
~/.openclaw/
├── openclaw.json       # Main config
├── .env                # API keys
├── workspace/          # Agent workspace
│   ├── AGENTS.md       # Operating instructions
│   ├── SOUL.md         # Persona/boundaries
│   ├── TOOLS.md        # Tool usage notes
│   ├── IDENTITY.md     # Name/emoji
│   ├── USER.md         # User profile
│   └── skills/         # Custom skills
├── skills/             # Managed skills
├── cron/               # Cron job configs
└── nodes/              # Paired devices
</pre>

<h2>Message Flow</h2>
<ol>
  <li>Message arrives at Gateway from a Channel</li>
  <li>Gateway routes to appropriate Session</li>
  <li>Agent Runtime processes with context</li>
  <li>Agent calls Tools as needed</li>
  <li>Response sent back through Channel</li>
</ol>
`
  },

  config: {
    title: "⚙️ Config Editor Guide",
    content: `
<h1>Config Editor</h1>
<p>The Control UI's <strong>Config tab</strong> lets you edit <code>~/.openclaw/openclaw.json</code> in two modes:</p>
<ul>
  <li><strong>Form mode</strong> - Structured fields with explanations</li>
  <li><strong>JSON mode</strong> - Raw JSON editing (for advanced users)</li>
</ul>

<h2>Config Sections</h2>

<h3>agent (Required)</h3>
<pre><code>{
  agent: {
    model: "anthropic/claude-sonnet-4-6"  // Primary model
  }
}</code></pre>

<h3>channels</h3>
<pre><code>{
  channels: {
    telegram: {
      enabled: true,
      botToken: "123:ABC...",        // From @BotFather
      dmPolicy: "pairing",           // pairing|allowlist|open|disabled
      allowFrom: [],                  // Allowed user IDs
      groupPolicy: "disabled"         // allowlist|open|disabled
    }
  }
}</code></pre>

<h3>agents</h3>
<pre><code>{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",
      model: "anthropic/claude-sonnet-4-6",
      skills: [],                     // Default skill allowlist
      sandbox: {
        mode: "non-main",            // non-main|all|off
        backend: "docker"             // docker|ssh|openshell
      }
    },
    list: []                         // Per-agent overrides
  }
}</code></pre>

<h3>gateway</h3>
<pre><code>{
  gateway: {
    port: 18789,                      // Default port
    bind: "loopback",                 // loopback|lan|tailnet|auto
    auth: {
      mode: "token"                   // token|password|trusted-proxy|none
    }
  }
}</code></pre>

<h3>ui</h3>
<pre><code>{
  ui: {
    seamColor: "#00D4AA",             // Accent color
    assistant: {
      name: "Assistant",
      avatar: ""                      // URL or empty for default
    }
  }
}</code></pre>

<h2>How to Edit</h2>
<ol>
  <li>Go to <strong>Config</strong> tab in Control UI</li>
  <li>Toggle between <strong>Form</strong> and <strong>JSON</strong> mode</li>
  <li>Make changes</li>
  <li>Click <strong>Save</strong> - changes apply immediately</li>
</ol>

<div class="tip">💡 Tip: Use JSON mode for complex nested configs. Use Form mode for simple key changes.</div>
`
  },

  channels: {
    title: "💬 Channels",
    content: `
<h1>Channels Configuration</h1>
<p><strong>Channels</strong> are messaging platform integrations. Each channel has its own settings section.</p>

<h2>Available Channels</h2>
<table>
  <tr><td>Telegram</td><td>Discord</td><td>WhatsApp</td></tr>
  <tr><td>Slack</td><td>Signal</td><td>iMessage</td></tr>
  <tr><td>Google Chat</td><td>MS Teams</td><td>Matrix</td></tr>
</table>

<h2>Channel Settings</h2>

<h3>Common Settings (all channels)</h3>
<table>
  <tr><td><strong>dmPolicy</strong></td><td>How to handle direct messages from unknown users:
    <ul>
      <li><code>pairing</code> - Send a pairing code (default, recommended)</li>
      <li><code>allowlist</code> - Only allow listed users</li>
      <li><code>open</code> - Allow all (not recommended)</li>
      <li><code>disabled</code> - Ignore DMs</li>
    </ul>
  </td></tr>
  <tr><td><strong>allowFrom</strong></td><td>Array of user IDs allowed to interact (for allowlist mode)</td></tr>
  <tr><td><strong>groupPolicy</strong></td><td>How to handle group messages: allowlist|open|disabled</td></tr>
</table>

<h2>Telegram Setup</h2>
<ol>
  <li>Message <strong>@BotFather</strong> on Telegram</li>
  <li>Send <code>/newbot</code> and follow prompts</li>
  <li>Copy the <strong>bot token</strong> (looks like <code>123456:ABC-DEF...</code>)</li>
  <li>In Control UI → Channels → Telegram:
    <ul>
      <li>Paste the bot token</li>
      <li>Set dmPolicy to <code>pairing</code></li>
    </ul>
  </li>
  <li>Send a message to your bot</li>
  <li>You'll get a pairing code like <code>ETWMNPPU</code></li>
  <li>Approve with CLI: <code>openclaw pairing approve telegram ETWMNPPU</code></li>
</ol>

<h2>Discord Setup</h2>
<ol>
  <li>Go to <a href="https://discord.com/developers/applications">Discord Developer Portal</a></li>
  <li>Create a new Application</li>
  <li>Add a Bot to your application</li>
  <li>Copy the <strong>Bot Token</strong></li>
  <li>Enable <strong>Message Content Intent</strong> in Bot settings</li>
  <li>Create an invite link with bot permissions</li>
  <li>Paste token in Control UI → Channels → Discord</li>
</ol>

<h2>WhatsApp Setup</h2>
<p>WhatsApp uses your personal WhatsApp account (via WhatsApp Web):</p>
<ol>
  <li>Go to Channels → WhatsApp in Control UI</li>
  <li>Click <strong>Link Device</strong></li>
  <li>Scan the QR code with your phone</li>
  <li>Set dmPolicy to <code>pairing</code></li>
</ol>

<div class="tip">💡 Tip: Start with Telegram - it's the easiest to set up and most reliable.</div>
`
  },

  agents: {
    title: "🤖 Agents",
    content: `
<h1>Multi-Agent System</h1>
<p>OpenClaw supports <strong>multiple agents</strong>, each with isolated workspace, model, skills, and permissions.</p>

<h2>Default Agent Config</h2>
<pre><code>{
  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",
      model: "anthropic/claude-sonnet-4-6",
      skills: [],
      sandbox: {
        mode: "non-main",    // Run non-main sessions in Docker
        backend: "docker"
      },
      heartbeat: {
        enabled: true,       // Periodic lightweight runs
        interval: "25m"
      },
      compaction: {
        mode: "summarize",   // When context gets full
        after: 150000         // Tokens before compaction
      }
    }
  }
}</code></pre>

<h2>Per-Agent Overrides</h2>
<pre><code>{
  agents: {
    list: [
      {
        id: "coding",
        model: "anthropic/claude-sonnet-4-6",
        skills: ["coding", "research"],
        workspace: "~/.openclaw/workspaces/coding"
      }
    ]
  }
}</code></pre>

<h2>Agent Bindings</h2>
<p>Route messages to specific agents based on channel or user:</p>
<pre><code>{
  agents: {
    bindings: [
      { channel: "telegram", agent: "main" },
      { channel: "discord", agent: "main" }
    ]
  }
}</code></pre>

<h2>Workspace Files</h2>
<p>Each agent workspace contains:</p>
<table>
  <tr><td><strong>AGENTS.md</strong></td><td>Operating instructions for the agent</td></tr>
  <tr><td><strong>SOUL.md</strong></td><td>Persona, personality, and boundaries</td></tr>
  <tr><td><strong>TOOLS.md</strong></td><td>Notes on tool usage and preferences</td></tr>
  <tr><td><strong>IDENTITY.md</strong></td><td>Agent's name and avatar emoji</td></tr>
  <tr><td><strong>USER.md</strong></td><td>Info about the user (you)</td></tr>
  <tr><td><strong>HEARTBEAT.md</strong></td><td>Instructions for heartbeat runs</td></tr>
</table>

<h2>Heartbeat</h2>
<p>Periodic lightweight agent runs to maintain context and prevent stale sessions. Configure in agents.defaults.heartbeat.</p>

<h2>Compaction</h2>
<p>When a session's context gets too large, OpenClaw can summarize older messages to free up space. Set <code>compaction.after</code> to token limit.</p>
`
  },

  models: {
    title: "🧠 Models",
    content: `
<h1>Model Configuration</h1>
<p>OpenClaw supports multiple AI providers and models.</p>

<h2>Default Config</h2>
<pre><code>{
  agent: {
    model: "anthropic/claude-sonnet-4-6"
  },
  models: {
    providers: {
      "anthropic": {
        apiKey: "$ANTHROPIC_API_KEY"  // From .env
      },
      "openai": {
        apiKey: "$OPENAI_API_KEY"
      }
    }
  }
}</code></pre>

<h2>Supported Providers</h2>
<table>
  <tr><td><strong>Anthropic</strong></td><td>Claude models (recommended)</td></tr>
  <tr><td><strong>OpenAI</strong></td><td>GPT-4, GPT-4o, etc.</td></tr>
  <tr><td><strong>OpenRouter</strong></td><td>Access to many models</td></tr>
  <tr><td><strong>Groq</strong></td><td>Fast inference</td></tr>
  <tr><td><strong>Custom</strong></td><td>Any OpenAI-compatible API</td></tr>
</table>

<h2>Model Fallbacks</h2>
<pre><code>{
  agent: {
    model: [
      "anthropic/claude-sonnet-4-6",
      "anthropic/claude-3-5-sonnet-4",
      "openai/gpt-4o"
    ]
  }
}</code></pre>
<p>The agent tries models in order; if one fails, it falls back to the next.</p>

<h2>Custom Provider Example</h2>
<pre><code>{
  models: {
    providers: {
      "custom-proxy": {
        baseUrl: "https://api.your-proxy.com/v1",
        apiKey: "your-key",
        api: "openai-compations"  // or "anthropic"
      }
    }
  }
}</code></pre>

<h2>Setting API Keys</h2>
<p>Create <code>~/.openclaw/.env</code>:</p>
<pre><code>ANTHROPIC_API_KEY=sk-ant-api03-...
OPENAI_API_KEY=sk-...</code></pre>

<div class="tip">💡 Tip: Claude models (Anthropic) work best with OpenClaw's agent system. Get an API key at console.anthropic.com</div>
`
  },

  skills: {
    title: "📦 Skills",
    content: `
<h1>Skills System</h1>
<p><strong>Skills</strong> are Markdown files (SKILL.md) that teach the agent how to use tools, follow workflows, and handle specific tasks.</p>

<h2>Skill Locations</h2>
<ol>
  <li><strong>Workspace skills</strong>: <code>~/.openclaw/workspace/skills/</code></li>
  <li><strong>Managed skills</strong>: <code>~/.openclaw/skills/</code></li>
  <li><strong>Bundled skills</strong>: Shipped with OpenClaw</li>
  <li><strong>Extra dirs</strong>: Configured in <code>skills.load.extraDirs</code></li>
</ol>

<h2>Installing Skills</h2>
<pre><code>openclaw skills install &lt;skill-name&gt;</code></pre>
<p>Or browse <strong>ClawHub</strong> at clawhub.ai for community skills.</p>

<h2>Skill Config</h2>
<pre><code>{
  skills: {
    allowBundled: ["github", "web-search", "code"],
    load: {
      extraDirs: ["/path/to/custom/skills"]
    },
    install: {
      registry: "https://clawhub.ai"
    },
    entries: {
      "my-skill": {
        enabled: true,
        config: { key: "value" }
      }
    }
  }
}</code></pre>

<h2>Skill Allowlist</h2>
<pre><code>{
  agents: {
    defaults: {
      skills: ["github", "research", "writing"]
    }
  }
}</code></pre>

<h2>Skill Structure</h2>
<p>A skill is a <code>SKILL.md</code> file containing:</p>
<ul>
  <li><strong>Trigger conditions</strong> - When to use this skill</li>
  <li><strong>Instructions</strong> - Step-by-step guidance</li>
  <li><strong>Examples</strong> - Usage examples</li>
  <li><strong>Pitfalls</strong> - Common mistakes to avoid</li>
</ul>

<h2>Popular Bundled Skills</h2>
<table>
  <tr><td>github</td><td>GitHub workflow - PRs, issues, repos</td></tr>
  <tr><td>web-search</td><td>Search and fetch web content</td></tr>
  <tr><td>code</td><td>Coding assistance and code review</td></tr>
  <tr><td>research</td><td>Academic research and paper discovery</td></tr>
  <tr><td>writing</td><td>Content creation and editing</td></tr>
</table>
`
  },

  sessions: {
    title: "💭 Sessions",
    content: `
<h1>Sessions</h1>
<p><strong>Sessions</strong> are conversation contexts. Messages route to sessions based on source and configuration.</p>

<h2>Session Scope</h2>
<pre><code>{
  session: {
    dmScope: "per-peer",  // How to scope DM conversations
    reset: {
      schedule: "daily",  // Reset schedule: daily|idle|manual
      idleAfter: "30m"     // Idle time before reset
    },
    maintenance: {
      pruneAfter: "30d",   // Auto-delete sessions after
      maxEntries: 1000,    // Max messages per session
      maxDiskBytes: 10000000  // Max disk usage
    }
  }
}</code></pre>

<h2>DM Scope Options</h2>
<table>
  <tr><td><strong>main</strong></td><td>All DMs share one session</td></tr>
  <tr><td><strong>per-peer</strong></td><td>One session per user (default)</td></tr>
  <tr><td><strong>per-channel-peer</strong></td><td>One session per user per channel</td></tr>
  <tr><td><strong>per-account-channel-peer</strong></td><td>One session per account/channel/user combo</td></tr>
</table>

<h2>Session Maintenance</h2>
<p>OpenClaw automatically cleans up old sessions based on your maintenance settings. You can also manually reset sessions via the Sessions tab in Control UI.</p>

<h2>Viewing Sessions</h2>
<ol>
  <li>Go to <strong>Sessions</strong> tab in Control UI</li>
  <li>See all active sessions with last activity time</li>
  <li>Click a session to view conversation history</li>
  <li>Use <strong>Reset</strong> to clear a session's context</li>
</ol>
`
  },

  tools: {
    title: "🔧 Tools",
    content: `
<h1>Tools Configuration</h1>
<p><strong>Tools</strong> are functions the agent can call: shell commands, file I/O, web access, messaging, etc.</p>

<h2>Tool Profiles</h2>
<pre><code>{
  tools: {
    profile: "full"  // minimal|coding|messaging|full
  }
}</code></pre>
<table>
  <tr><td><strong>minimal</strong></td><td>Read-only tools only</td></tr>
  <tr><td><strong>coding</strong></td><td>Coding-focused tools</td></tr>
  <tr><td><strong>messaging</strong></td><td>Messaging and communication</td></tr>
  <tr><td><strong>full</strong></td><td>All tools enabled (default)</td></tr>
</table>

<h2>Tool Allowlists</h2>
<pre><code>{
  tools: {
    allow: ["exec", "read", "write", "web_search"],
    deny: ["sudo", "ssh"]
  }
}</code></pre>

<h2>Built-in Tools</h2>
<table>
  <tr><td><strong>exec</strong></td><td>Run shell commands</td></tr>
  <tr><td><strong>read</strong></td><td>Read files</td></tr>
  <tr><td><strong>write</strong></td><td>Write/edit files</td></tr>
  <tr><td><strong>browser</strong></td><td>Control Chromium browser</td></tr>
  <tr><td><strong>web_search</strong></td><td>Search the web</td></tr>
  <tr><td><strong>web_fetch</strong></td><td>Fetch web pages</td></tr>
  <tr><td><strong>message</strong></td><td>Send messages via channels</td></tr>
  <tr><td><strong>tts</strong></td><td>Text-to-speech</td></tr>
  <tr><td><strong>cron</strong></td><td>Schedule and manage jobs</td></tr>
  <tr><td><strong>gateway</strong></td><td>Gateway control</td></tr>
  <tr><td><strong>sessions_*</strong></td><td>Session management</td></tr>
</table>

<h2>Exec Settings</h2>
<pre><code>{
  tools: {
    exec: {
      timeout: 60,           // Max seconds per command
      background: true,       // Allow background processes
      elevated: {
        enabled: false,
        requireReason: true
      }
    }
  }
}</code></pre>

<h2>Browser Settings</h2>
<pre><code>{
  browser: {
    enabled: true,
    profiles: {
      default: {
        cdpPort: 9222
      }
    },
    defaultProfile: "default",
    ssrfPolicy: "block"     // Prevent SSRF attacks
  }
}</code></pre>

<h2>Web Tool Settings</h2>
<pre><code>{
  tools: {
    web: {
      search: {
        provider: "ddg"     // duckduckgo
      },
      fetch: {
        timeout: 30
      }
    }
  }
}</code></pre>

<h2>Loop Detection</h2>
<pre><code>{
  tools: {
    loopDetection: {
      enabled: true,
      maxIterations: 100
    }
  }
}</code></pre>
`
  },

  sandbox: {
    title: "📦 Sandbox",
    content: `
<h1>Sandbox Configuration</h1>
<p><strong>Sandbox</strong> isolates agent sessions in containers (Docker) to restrict access and prevent accidents.</p>

<h2>Sandbox Modes</h2>
<table>
  <tr><td><strong>off</strong></td><td>No sandboxing - all sessions run directly (not recommended)</td></tr>
  <tr><td><strong>non-main</strong></td><td>Only non-main sessions are sandboxed (default, recommended)</td></tr>
  <tr><td><strong>all</strong></td><td>All sessions including main are sandboxed</td></tr>
</table>

<h2>Sandbox Backend</h2>
<pre><code>{
  agents: {
    defaults: {
      sandbox: {
        mode: "non-main",
        backend: "docker"  // docker|ssh|openshell
      }
    }
  }
}</code></pre>

<h2>Docker Requirements</h2>
<p>For Docker sandboxing:</p>
<ol>
  <li>Install Docker: <code>sudo apt install docker.io</code></li>
  <li>Start Docker: <code>sudo systemctl start docker</code></li>
  <li>Add your user to docker group: <code>sudo usermod -aG docker $USER</code></li>
  <li>Log out and back in for group changes to take effect</li>
</ol>

<h2>SSH Sandbox</h2>
<p>For SSH sandboxing:</p>
<pre><code>{
  agents: {
    defaults: {
      sandbox: {
        backend: "ssh",
        ssh: {
          host: "remote-server",
          user: "agent",
          key: "~/.ssh/id_rsa"
        }
      }
    }
  }
}</code></pre>

<h2>Tool Restrictions in Sandbox</h2>
<p>Sandboxed sessions can have restricted tool access based on <code>tools.allow</code> and <code>tools.deny</code> config.</p>

<div class="tip">💡 Tip: Keep sandbox mode at "non-main" for safety while maintaining full access in your primary session.</div>
`
  },

  gateway: {
    title: "🌐 Gateway",
    content: `
<h1>Gateway Configuration</h1>
<p>The <strong>Gateway</strong> is the central daemon that routes messages, manages channels, and runs the agent.</p>

<h2>Basic Gateway Config</h2>
<pre><code>{
  gateway: {
    port: 18789,           // Default port
    bind: "loopback",       // Where to listen
    auth: {
      mode: "token"         // Security mode
    }
  }
}</code></pre>

<h2>Bind Options</h2>
<table>
  <tr><td><strong>loopback</strong></td><td>Only localhost (default, most secure)</td></tr>
  <tr><td><strong>lan</strong></td><td>All network interfaces (for local network access)</td></tr>
  <tr><td><strong>tailnet</strong></td><td>Tailscale network only</td></tr>
  <tr><td><strong>auto</strong></td><td>Automatic detection</td></tr>
</table>

<h2>Auth Modes</h2>
<table>
  <tr><td><strong>token</strong></td><td>Require gateway token (default)</td></tr>
  <tr><td><strong>password</strong></td><td>Password authentication</td></tr>
  <tr><td><strong>trusted-proxy</strong></td><td>Trust X-Forwarded-For from proxy</td></tr>
  <tr><td><strong>none</strong></td><td>No authentication (not recommended)</td></tr>
</table>

<h2>Control UI Settings</h2>
<pre><code>{
  gateway: {
    controlUi: {
      enabled: true,
      basePath: "/",        // UI base path
      allowedOrigins: []     // CORS origins
    }
  }
}</code></pre>

<h2>Hot Reload</h2>
<pre><code>{
  gateway: {
    reload: "hybrid"  // off|restart|hot|hybrid
  }
}</code></pre>
<table>
  <tr><td><strong>off</strong></td><td>Manual restart required</td></tr>
  <tr><td><strong>restart</strong></td><td>Full restart on config change</td></tr>
  <tr><td><strong>hot</strong></td><td>Hot reload without restart</td></tr>
  <tr><td><strong>hybrid</strong></td><td>Smart - hot when possible, restart when needed</td></tr>
</table>

<h2>Tailscale Integration</h2>
<pre><code>{
  gateway: {
    tailscale: {
      serve: true,        // Use Tailscale to serve
      funnel: false       // Enable Tailscale funnel
    }
  }
}</code></pre>

<h2>Remote Gateway</h2>
<pre><code>{
  gateway: {
    remote: {
      enabled: false,
      url: "",
      token: ""
    }
  }
}</code></pre>

<h2>CLI Gateway Commands</h2>
<pre><code>openclaw gateway start      # Start gateway
openclaw gateway stop       # Stop gateway
openclaw gateway restart    # Restart gateway
openclaw gateway status      # Check status
openclaw gateway logs        # View logs</code></pre>
`
  },

  security: {
    title: "🔒 Security",
    content: `
<h1>Security Configuration</h1>
<p>OpenClaw has multiple layers of security to control who can interact with your agent.</p>

<h2>Pairing System</h2>
<p>When <code>dmPolicy</code> is set to <code>pairing</code> (recommended):</p>
<ol>
  <li>Unknown user sends a message</li>
  <li>OpenClaw generates a unique pairing code</li>
  <li>User receives the code in the Control UI or logs</li>
  <li>Approve with CLI: <code>openclaw pairing approve &lt;channel&gt; &lt;code&gt;</code></li>
</ol>

<pre><code>{
  channels: {
    telegram: {
      dmPolicy: "pairing",
      allowFrom: []
    }
  }
}</code></pre>

<h2>Allowlist Mode</h2>
<p>For stricter control, use allowlist mode:</p>
<pre><code>{
  channels: {
    telegram: {
      dmPolicy: "allowlist",
      allowFrom: ["12345678", "87654321"]  // User IDs
    }
  }
}</code></pre>

<h2>Gateway Authentication</h2>
<pre><code>{
  gateway: {
    auth: {
      mode: "token"  // Require token for API access
    }
  }
}</code></pre>

<h2>Getting Your Gateway Token</h2>
<pre><code>cat ~/.openclaw/.gateway-token</code></pre>

<h2>Tool Permissions</h2>
<pre><code>{
  tools: {
    deny: ["sudo", "rm -rf /", "ssh"]  // Block dangerous commands
  }
}</code></pre>

<h2>Sandboxing</h2>
<p>Use sandbox mode to isolate agent sessions:</p>
<pre><code>{
  agents: {
    defaults: {
      sandbox: {
        mode: "non-main"  // Sandbox non-main sessions
      }
    }
  }
}</code></pre>

<h2>Security Best Practices</h2>
<ul>
  <li>✅ Keep <code>bind: "loopback"</code> for local-only access</li>
  <li>✅ Use <code>dmPolicy: "pairing"</code> for new channels</li>
  <li>✅ Don't expose gateway to internet without auth</li>
  <li>✅ Use sandbox mode for unfamiliar code execution</li>
  <li>❌ Don't set <code>dmPolicy: "open"</code></li>
  <li>❌ Don't set <code>gateway.auth.mode: "none"</code></li>
</ul>

<h2>Pairing Management</h2>
<pre><code>openclaw pairing list       # List pending approvals
openclaw pairing approve &lt;channel&gt; &lt;code&gt;
openclaw pairing revoke &lt;channel&gt; &lt;user_id&gt;</code></pre>
`
  },

  webhooks: {
    title: "🪝 Webhooks",
    content: `
<h1>Webhooks Configuration</h1>
<p><strong>Webhooks</strong> let external services trigger agent actions via HTTP requests.</p>

<h2>Basic Webhook Config</h2>
<pre><code>{
  hooks: {
    enabled: true,
    token: "your-webhook-token",  // Secure with a token
    path: "/webhook",             // Webhook endpoint path
    mappings: [
      {
        path: "/github",
        agent: "main",
        channel: "telegram"
      }
    ]
  }
}</code></pre>

<h2>Webhook Mappings</h2>
<p>Route incoming webhooks to specific agents:</p>
<pre><code>{
  hooks: {
    mappings: [
      {
        path: "/github",
        agent: "main",
        channel: "telegram"
      },
      {
        path: "/cron-report",
        agent: "reports",
        channel: "discord"
      }
    ]
  }
}</code></pre>

<h2>Security</h2>
<ul>
  <li>Always set a <code>token</code> to prevent unauthorized access</li>
  <li>Validate webhook signatures when possible</li>
  <li>Use HTTPS for production webhooks</li>
</ul>

<h2>Testing Webhooks</h2>
<pre><code>curl -X POST http://127.0.0.1:18789/webhook/github \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Token: your-token" \\
  -d '{"action": "push", "repo": "my-repo"}'</code></pre>

<h2>GitHub Webhook Example</h2>
<p>To receive GitHub webhooks:</p>
<ol>
  <li>Go to GitHub repo → Settings → Webhooks</li>
  <li>Add webhook: <code>https://your-server/webhook/github</code></li>
  <li>Set content type to JSON</li>
  <li>Set secret token (same as in config)</li>
  <li>Select events to trigger on</li>
</ol>
`
  },

  troubleshooting: {
    title: "🔍 Troubleshooting",
    content: `
<h1>Troubleshooting Guide</h1>

<h2>Gateway Won't Start</h2>
<p><strong>Symptom:</strong> <code>openclaw gateway</code> fails or exits immediately</p>
<h3>Solutions:</h3>
<ul>
  <li>Check if port 18789 is already in use: <code>sudo lsof -i :18789</code></li>
  <li>Check config syntax: <code>openclaw config validate</code></li>
  <li>View logs: <code>openclaw gateway logs</code></li>
  <li>Try starting with verbose: <code>openclaw gateway -vv</code></li>
</ul>

<h2>Channel Not Connecting</h2>
<p><strong>Symptom:</strong> Messages not coming through on Telegram/Discord/etc.</p>
<h3>Solutions:</h3>
<ol>
  <li>Verify bot token is correct in config</li>
  <li>Check channel is enabled: <code>channels.&lt;name&gt;.enabled: true</code></li>
  <li>Check gateway logs for auth errors</li>
  <li>For Telegram: ensure bot has not been blocked by user</li>
  <li>Restart gateway: <code>openclaw gateway restart</code></li>
</ol>

<h2>Pairing Code Not Working</h2>
<p><strong>Symptom:</strong> User sends message but no pairing code received</p>
<h3>Solutions:</h3>
<ul>
  <li>Check <code>dmPolicy</code> is set to <code>pairing</code></li>
  <li>View pending pairings: <code>openclaw pairing list</code></li>
  <li>Manually approve: <code>openclaw pairing approve telegram ETWMNPPU</code></li>
  <li>Check pairing code hasn't expired</li>
</ul>

<h2>Agent Not Responding</h2>
<p><strong>Symptom:</strong> Messages sent but no AI response</p>
<h3>Solutions:</h3>
<ul>
  <li>Verify API key is set in <code>~/.openclaw/.env</code></li>
  <li>Check <code>agent.model</code> is configured</li>
  <li>Test API key directly: <code>openclaw models test</code></li>
  <li>Check Usage tab for rate limit errors</li>
  <li>View agent logs in Control UI → Logs</li>
</ul>

<h2>Skills Not Loading</h2>
<p><strong>Symptom:</strong> Skills tab empty or skills not working</p>
<h3>Solutions:</h3>
<ul>
  <li>Check skills directory exists: <code>ls ~/.openclaw/skills/</code></li>
  <li>Verify skill files are named <code>SKILL.md</code></li>
  <li>Check <code>skills.allowBundled</code> includes needed skills</li>
  <li>Run: <code>openclaw skills list</code> to see installed skills</li>
  <li>Try reinstalling: <code>openclaw skills install &lt;name&gt;</code></li>
</ul>

<h2>Docker Sandbox Not Working</h2>
<p><strong>Symptom:</strong> Sandboxed sessions fail or Docker errors</p>
<h3>Solutions:</h3>
<ul>
  <li>Verify Docker is installed: <code>docker --version</code></li>
  <li>Check Docker is running: <code>sudo systemctl status docker</code></li>
  <li>Add user to docker group: <code>sudo usermod -aG docker $USER</code></li>
  <li>Log out and back in, then restart gateway</li>
  <li>Try: <code>docker run hello-world</code> to test</li>
</ul>

<h2>Config Changes Not Applying</h2>
<p><strong>Symptom:</strong> Edited config but behavior unchanged</p>
<h3>Solutions:</h3>
<ul>
  <li>Save config and restart gateway: <code>openclaw gateway restart</code></li>
  <li>Or set <code>gateway.reload: "hot"</code> for auto-reload</li>
  <li>Verify you're editing the correct config file</li>
  <li>Check for syntax errors in JSON</li>
</ul>

<h2>Get Help</h2>
<ul>
  <li>View all gateway logs: <code>openclaw gateway logs</code></li>
  <li>Debug mode: <code>openclaw gateway -vv</code></li>
  <li>Check OpenClaw GitHub issues</li>
  <li>Ask in OpenClaw community channels</li>
</ul>

<h2>Useful Commands</h2>
<pre><code>openclaw gateway status     # Check if running
openclaw gateway restart    # Restart gateway
openclaw gateway logs        # View logs
openclaw config validate     # Check config syntax
openclaw pairing list        # List pending pairings
openclaw skills list         # List installed skills
openclaw models test         # Test model API</code></pre>
`
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KNOWLEDGE_BASE;
}
