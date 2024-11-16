document.addEventListener('DOMContentLoaded', () => { 
        const socket = io(); 
     
        const messageInput = document.getElementById('message-input'); 
        const sendButton = document.getElementById('send-button'); 
        const messagesDiv = document.getElementById('messages'); 
     
        sendButton.addEventListener('click', () => { 
            const message = messageInput.value; 
            if (message.trim() !== '') { 
                socket.emit('chat message', message); 
                appendMessage('You: ' +  message); 
                messageInput.value = ''; 
            } 
        }); 
     
        socket.on('bot reply', (msg) => { 
            appendMessage('Grok: ' + msg); 
        }); 
     
        function appendMessage(message) { 
            const messageElement = document.createElement('p'); 
            messageElement.textContent = message; 
            messagesDiv.appendChild(messageElement); 
            messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto scroll to bottom 
        } 
    }); 
