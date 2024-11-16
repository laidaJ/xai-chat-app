const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
require('dotenv').config();
const axios = require('axios');
const XAI_ENDPOINT = 'https://api.xai.com/your-endpoint';

// Function to make an API call
async function callXAIAPI() {
  try {
    const response = await axios.post(XAI_ENDPOINT, {
    
    })
  }
}

// Server static file from the public directory
app.use(express.static('public'));
app.use(bodyParser.json());

// A simple endpoint to keep the server alive
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

// Interaction whti xAI
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('chat message', (msg) => {
    const response = `Hello! I'm Grok, your AI assiant. You said: ${msg}, How can i help?`;
    socket.emit('bot replay', response);
  });
  socket.on('disconnect', () => {
    console.log("User disconnected");
  })
})

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
