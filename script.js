// Select elements
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to append a message
function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Handle message send
sendButton.addEventListener('click', async () => {
    const userMessage = messageInput.value.trim();
    if (userMessage) {
        appendMessage('user', userMessage);
        messageInput.value = ''; // Clear input

        try {
            // Make a POST request to the FastAPI backend
            const response = await fetch('http://127.0.0.1:8000/chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage })
            });

            // Parse the response from FastAPI
            const data = await response.json();

            // Append the AI's response
            if (data.response) {
                appendMessage('ai', data.response);
            } else if (data.error) {
                appendMessage('ai', 'Error: ' + data.error);
            }
        } catch (error) {
            appendMessage('ai', 'Error: ' + error.message);
        }
    }
});

// Allow "Enter" key to send message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
