document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    // Function to append a message to the chat
    function addMessageToChat(author, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", author);
        messageDiv.innerText = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    // Send message to backend (Hugging Face space)
    async function sendMessage() {
        const userMessage = messageInput.value.trim();
        if (!userMessage) return;

        // Add user message to chat
        addMessageToChat("user", userMessage);

        // Clear input field
        messageInput.value = "";

        try {
            // Send user message to Hugging Face space (change URL to your Hugging Face space URL)
            const response = await fetch("https://your-hugging-face-space-url/send_message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const botResponse = data.response || "Sorry, I couldn't process that.";
            
            // Add AI response to chat
            addMessageToChat("bot", botResponse);
        } catch (error) {
            console.error("Error:", error);
            addMessageToChat("bot", "An error occurred while communicating with the AI.");
        }
    }

    // Event listeners
    sendButton.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
