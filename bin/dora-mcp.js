#!/usr/bin/env node

/**
 * Dora MCP Stdio Bridge
 *
 * Exposes Dora's Model Context Protocol tools to Stdio-based MCP clients
 * like Google Antigravity, Claude Code, Cursor, Zed, Windsurf, etc.
 *
 * Usage:
 *   DORA_API_KEY=dora_sk_... node bin/dora-mcp.js
 *
 * Or in mcp_config.json:
 *   {
 *     "mcpServers": {
 *       "dora": {
 *         "command": "node",
 *         "args": ["/path/to/Dora/bin/dora-mcp.js"],
 *         "env": {
 *           "DORA_API_KEY": "dora_sk_..."
 *         }
 *       }
 *     }
 *   }
 */

const readline = require('readline');

// Parse command-line args or environment variables
function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx !== -1 && idx + 1 < process.argv.length) {
    return process.argv[idx + 1];
  }
  return null;
}

const apiKey =
  process.env.DORA_API_KEY ||
  getArg('--api-key') ||
  getArg('--key') ||
  '';

const endpoint =
  process.env.DORA_ENDPOINT ||
  getArg('--endpoint') ||
  'https://doravideo.com/mcp';

if (!apiKey) {
  process.stderr.write(
    '[dora-mcp] Warning: DORA_API_KEY is not set. Requests will fail until an API key is provided.\n' +
    '[dora-mcp] Set DORA_API_KEY in your environment or pass --api-key <key>.\n'
  );
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// Forward JSON-RPC request to Dora MCP HTTP endpoint
async function handleRequest(rawLine) {
  const line = rawLine.trim();
  if (!line) return;

  let message;
  try {
    message = JSON.parse(line);
  } catch (err) {
    process.stderr.write(`[dora-mcp] Invalid JSON: ${err.message}\n`);
    const errorResponse = {
      jsonrpc: '2.0',
      id: null,
      error: { code: -32700, message: 'Parse error' },
    };
    process.stdout.write(JSON.stringify(errorResponse) + '\n');
    return;
  }

  const isNotification = message.id === undefined || message.id === null;

  if (!apiKey && !isNotification) {
    const errorResponse = {
      jsonrpc: '2.0',
      id: message.id,
      error: {
        code: -32001,
        message:
          'DORA_API_KEY is missing. Please set DORA_API_KEY in your MCP config (mcp_config.json) with your Dora API key (dora_sk_...).',
      },
    };
    process.stdout.write(JSON.stringify(errorResponse) + '\n');
    return;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'User-Agent': 'dora-mcp-stdio/1.0.0',
      },
      body: line,
    });

    const data = await res.json();

    // Per JSON-RPC 2.0 / MCP spec, do not reply to notifications
    if (isNotification) {
      return;
    }

    process.stdout.write(JSON.stringify(data) + '\n');
  } catch (error) {
    process.stderr.write(`[dora-mcp] Network/HTTP error: ${error.message}\n`);
    if (!isNotification) {
      const errorResponse = {
        jsonrpc: '2.0',
        id: message.id,
        error: {
          code: -32603,
          message: `Failed to connect to Dora MCP endpoint (${endpoint}): ${error.message}`,
        },
      };
      process.stdout.write(JSON.stringify(errorResponse) + '\n');
    }
  }
}

rl.on('line', (line) => {
  handleRequest(line).catch((err) => {
    process.stderr.write(`[dora-mcp] Unexpected error: ${err.message}\n`);
  });
});

rl.on('close', () => {
  process.exit(0);
});

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
