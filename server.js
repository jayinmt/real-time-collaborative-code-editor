//server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

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

// Store chat messages in memory (not persistent)
const chatMessages = [];

// Handle Socket.IO connections
io.on('connection', (socket) => {
  // Handle user authentication
  socket.on('authenticate', (token) => {
    // TODO: Implement user authentication using JWT or sessions
    const userId = authenticateUser(token);
    if (userId) {
      users[socket.id] = userId;
      socket.emit('authenticated', userId);
      // Send recent chat history to the newly connected user
      socket.emit('chat_history', chatMessages.slice(-50)); // Send last 50 messages
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
    const newMessage = {
      user: users[socket.id] || 'Anonymous',
      message: message,
      timestamp: new Date()
    };
    chatMessages.push(newMessage);
    if (chatMessages.length > 100) {
      chatMessages.shift(); // Keep only the last 100 messages
    }
    io.emit('new_message', newMessage);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    delete users[socket.id];
    delete cursorPositions[socket.id];
    io.emit('user_disconnected', socket.id);
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Placeholder function for user authentication
function authenticateUser(token) {
  // TODO: Implement actual authentication logic
  return `User_${Math.floor(Math.random() * 1000)}`;
}

// Placeholder function for code execution
function executeCode(code) {
  // TODO: Implement safe code execution
  return 'Code execution not implemented';
}