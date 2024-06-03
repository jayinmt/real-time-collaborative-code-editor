# Real-time Collaborative Code Editor

This project is a real-time collaborative code editor that allows multiple users to simultaneously edit and view the same code file in real-time. It showcases the use of JavaScript, web sockets, and real-time synchronization to create a seamless collaborative coding experience.

## Features

- Real-time collaboration: Users can join a shared coding session and see each other's changes in real-time.
- Syntax highlighting: The code editor supports syntax highlighting for popular programming languages to enhance the coding experience.
- User presence: The application shows the cursor positions and selections of all connected users in the code editor.
- Code execution: Users can execute the collaborated code and see the output within the application.
- Chat functionality: A chat feature is included to enable users to communicate with each other while collaborating on the code.
- User authentication: A simple user authentication system is implemented to identify and manage connected users.
- Version history: The application keeps track of code changes and allows users to view and revert to previous versions of the code.

## Technologies and Libraries

- JavaScript (ES6+)
- Node.js and Express.js for the server-side implementation
- Socket.IO for real-time communication between the server and clients
- CodeMirror for the code editor component
- Highlight.js for syntax highlighting

## Getting Started

To run the collaborative code editor locally, follow these steps:

1. Clone the repository: git clone https://github.com/jaydxyz/real-time-collaborative-code-editor.git
2. Navigate to the project directory: cd collaborative-code-editor
3. Install the dependencies: npm install
4. Start the server: npm start
5. Open your web browser and visit `http://localhost:3000` to access the collaborative code editor.

## Usage

1. Open the collaborative code editor in your web browser.
2. Authenticate yourself by providing a username or token (depending on the implemented authentication mechanism).
3. Start coding in the code editor. Your changes will be synchronized in real-time with other connected users.
4. Use the chat functionality to communicate with other users while collaborating on the code.
5. Execute the code by clicking the "Run" button to see the output within the application.
6. Explore the version history by selecting different versions from the dropdown to view and revert to previous code snapshots.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [CodeMirror](https://codemirror.net/) - Code editor component
- [Highlight.js](https://highlightjs.org/) - Syntax highlighting library
- [Socket.IO](https://socket.io/) - Real-time communication library
