import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";
import { PLUGIN_VERSION } from "./generated-version.js";

export const PLUGIN_ID = "paperclip-chat";

const manifest: PaperclipPluginManifestV1 = {
  id: PLUGIN_ID,
  apiVersion: 1,
  version: PLUGIN_VERSION,
  displayName: "Chat",
  description:
    "Multi-adapter AI chat for Paperclip. Supports Claude, Codex, and OpenCode with real-time streaming, session persistence, and tool visibility.",
  author: "Paperclip",
  categories: ["workspace", "ui"],
  capabilities: [
    // UI
    "ui.page.register",
    "ui.sidebar.register",
    // Agent sessions (streaming chat)
    "agent.sessions.create",
    "agent.sessions.list",
    "agent.sessions.send",
    "agent.sessions.close",
    // Read agents for adapter/model discovery
    "agents.read",
    // Plugin state for thread/message persistence
    "plugin.state.read",
    "plugin.state.write",
    // Activity logging
    "activity.log.write",
  ],
  entrypoints: {
    worker: "./dist/worker.js",
    ui: "./dist/ui",
  },

  // Plugin-level config schema (operator-editable)
  instanceConfigSchema: {
    type: "object",
    properties: {
      defaultAdapterType: {
        type: "string",
        title: "Default Adapter",
        description: "Which adapter to use by default for new threads",
        default: "claude_local",
        enum: ["claude_local", "codex_local", "opencode_local"],
      },
      systemPromptOverride: {
        type: "string",
        title: "System Prompt Override",
        description: "Custom system prompt appended to all chat sessions (optional)",
        default: "",
      },
    },
  },

  ui: {
    slots: [
      {
        type: "page",
        id: "chat-page",
        displayName: "Chat",
        exportName: "ChatPage",
      },
      {
        type: "sidebar",
        id: "chat-sidebar",
        displayName: "Chat",
        exportName: "ChatSidebarPanel",
      },
    ],
  },
};

export default manifest;
