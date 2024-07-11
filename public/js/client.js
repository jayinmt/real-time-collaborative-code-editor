// /public/js/client.js
const socket = io();
let codeMirror;
let isLocalChange = false;

document.addEventListener('DOMContentLoaded', (event) => {
    const codeEditor = document.getElementById('code-editor');
    if (codeEditor) {
        codeMirror = CodeMirror(codeEditor, {
            lineNumbers: true,
            mode: 'javascript',
            theme: 'default'
        });

        codeMirror.on('change', (cm, change) => {
            if (!isLocalChange) {
                console.log('Local change:', change);
                socket.emit('code_change', {
                    code: cm.getValue(),
                    change: change
                });
            }
        });

        codeMirror.on('cursorActivity', (cm) => {
            const cursor = cm.getCursor();
            socket.emit('cursor_position', {
                line: cursor.line,
                ch: cursor.ch
            });
        });
    } else {
        console.error('Code editor element not found');
    }

    // Chat functionality
    const chatInput = document.getElementById('chat-input');
    const chatButton = document.getElementById('chat-button');
    const chatMessages = document.getElementById('chat-messages');

    chatButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            socket.emit('chat_message', message);
            chatInput.value = '';
        }
    }

    socket.on('new_message', (data) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${data.user}: ${data.message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
});

socket.on('code_update', (data) => {
    console.log('Received code update:', data);
    if (codeMirror) {
        const currentCursor = codeMirror.getCursor();
        isLocalChange = true;
        codeMirror.setValue(data.code);
        codeMirror.setCursor(currentCursor);
        isLocalChange = false;
    } else {
        console.error('CodeMirror not initialized');
    }
});

// Handle incoming cursor position updates
socket.on('cursor_positions', (positions) => {
  // TODO: Implement visual representation of other users' cursors
});

// Handle authentication
function authenticate(token) {
  socket.emit('authenticate', token);
}

socket.on('authenticated', (userId) => {
  console.log('Authenticated as user:', userId);
  // TODO: Update UI to show authenticated state
});

socket.on('authentication_error', (error) => {
  console.error('Authentication error:', error);
  // TODO: Show error message in UI
});