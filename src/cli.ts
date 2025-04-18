#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';

const args = process.argv.slice(2);
const command = args[0]?.toLowerCase();

if (command === 'on') {
  console.log('Starting vibes... MCP server initializing...');
  
  const serverPath = path.join(__dirname, 'server.js');
  const child = spawn('node', [serverPath], {
    detached: true,
    stdio: ['ignore', 'ignore', 'ignore']
  });
  
  child.unref();
  console.log('Vibes flowing! The Matrix has you...');
  console.log('MCP running at http://localhost:3000');
  
  // Exit after starting the server process
  process.exit(0);
  
} else if (command === 'off') {
  console.log('Shutting down vibes...');
  
  // Find and kill the MCP server process
  const killProcess = spawn('pkill', ['-f', 'node.*server.js']);
  killProcess.on('close', (code) => {
    console.log('Vibes disconnected. Returning to reality.');
    process.exit(0);
  });
  
} else {
  console.log(`
Usage: vibes <command>

Commands:
  on   - Start the vibes (MCP server)
  off  - Stop the vibes (shutdown MCP server)

Example:
  vibes on
  `);
}
