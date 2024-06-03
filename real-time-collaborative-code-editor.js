const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const CodeMirror = require('codemirror');
const highlight = require('highlight.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set up Express.js to serve static files
app.use(express.static('public'));

// Store connected users and their cursor positions
const users = {};
const cursorPositions = {};

// Store code snapshots for version history
const codeHistory = [];

// Handle Socket.IO connections
io.on('connection', (socket) => {
  // Handle user authentication
  socket.on('authenticate', (token) => {
    // TODO: Implement user authentication using JWT or sessions
    const userId = authenticateUser(token);
    if (userId) {
      users[socket.id] = userId;
      socket.emit('authenticated', userId);
    } else {
      socket.emit('authentication_error', 'Invalid token');
    }
  });

  // Handle code changes
  socket.on('code_change', (data) => {
    io.emit('code_update', data);
    // Save code snapshot for version history
    codeHistory.push(data.code);
  });

  // Handle cursor position changes
  socket.on('cursor_position', (data) => {
    cursorPositions[socket.id] = data;
    io.emit('cursor_positions', cursorPositions);
  });

  // Handle code execution
  socket.on('execute_code', (code) => {
    // TODO: Execute code in a sandboxed environment or using a server-side execution API
    const output = executeCode(code);
    io.emit('execution_result', output);
  });

  // Handle chat messages
  socket.on('chat_message', (message) => {
    io.emit('new_message', {
      user: users[socket.id],
      message: message
    });
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    delete users[socket.id];
    delete cursorPositions[socket.id];
    io.emit('user_disconnected', socket.id);
  });
});

// Set up CodeMirror
const codeMirror = CodeMirror(document.getElementById('code-editor'), {
  lineNumbers: true,
  mode: 'javascript',
  theme: 'default'
});

// Set up syntax highlighting
codeMirror.on('change', (cm) => {
  highlight.highlightBlock(cm.getWrapperElement());
});

// Set up version history
const versionSelect = document.getElementById('version-select');
versionSelect.addEventListener('change', () => {
  const selectedVersion = versionSelect.value;
  codeMirror.setValue(codeHistory[selectedVersion]);
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
