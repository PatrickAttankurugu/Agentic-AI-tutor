document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const authContainer = document.getElementById('authContainer');
    const chatContainer = document.getElementById('chatContainer');
    const messagesContainer = document.getElementById('messages');
    const recentConversations = document.getElementById('recentConversations');
    const logoutButton = document.getElementById('logoutButton');
    const sendButton = document.getElementById('sendButton');
    const userInput = document.getElementById('userInput');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulate authentication (replace with actual authentication logic)
        if (username === 'user' && password === 'password') {
            authContainer.style.display = 'none';
            chatContainer.style.display = 'flex';
            document.getElementById('userGreeting').textContent = username;
        } else {
            alert('Invalid credentials');
        }
    });

    logoutButton.addEventListener('click', () => {
        authContainer.style.display = 'flex';
        chatContainer.style.display = 'none';
        messagesContainer.innerHTML = '';
        recentConversations.innerHTML = '';
    });

    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    sendButton.addEventListener('click', sendMessage);

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;

        addMessage(userMessage, 'user-message');
        userInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, 'bot-message');
            addRecentConversation(userMessage, botResponse);
        }, 500);
    }

    function addMessage(content, className) {
        const messageElement = document.createElement('div');
        messageElement.className = className;
        messageElement.innerText = content;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getBotResponse(userMessage) {
        // Implement your bot's response logic here
        // You can use conditional statements, pattern matching, or API calls to generate responses
        // Example simple response logic:
        if (userMessage.toLowerCase().includes('hello')) {
            return 'Hi there! How can I assist you today?';
        } else if (userMessage.toLowerCase().includes('design patterns')) {
            return 'Agentic AI design patterns include modularity, goal-orientation, and adaptability. Which pattern would you like to learn more about?';
        } else {
            return 'I apologize, but I am not sure how to respond to that. Could you please rephrase your question or provide more context?';
        }
    }

    function addRecentConversation(userMessage, botMessage) {
        const conversationElement = document.createElement('li');
        conversationElement.textContent = `User: ${truncateString(userMessage, 20)} / Bot: ${truncateString(botMessage, 20)}`;
        recentConversations.appendChild(conversationElement);

        // Limit the number of recent conversations to 5
        if (recentConversations.children.length > 5) {
            recentConversations.removeChild(recentConversations.firstChild);
        }
    }

    function truncateString(str, maxLength) {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        }
        return str;
    }
});