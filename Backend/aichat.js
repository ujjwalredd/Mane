document.getElementById("aiChatButton").addEventListener("click", function() {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.classList.add("active");
});

document.querySelector(".close-chat-btn").addEventListener("click", function() {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.classList.remove("active");
});

let isMinimized = false;
document.querySelector(".minimize-btn").addEventListener("click", function() {
  const chatWindow = document.getElementById("chatWindow");
  if (isMinimized) {
    chatWindow.style.height = "500px";
    chatWindow.style.bottom = "0";
  } else {
    chatWindow.style.height = "50px";
    chatWindow.style.bottom = "0";
  }
  isMinimized = !isMinimized;
});

// Rest of the JavaScript remains the same

  
  // Handle sending messages
  document.getElementById("sendMessageButton").addEventListener("click", sendMessage);
  document.getElementById("chatInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
  
  function sendMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
  
    if (message) {
      addMessage(message, "user");
      input.value = "";
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = "Thank you for your message. How can I assist you today?";
        addMessage(aiResponse, "ai");
      }, 1000);
    }
  }
  
  function addMessage(text, sender) {
    const messagesContainer = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    
    // Scroll to the bottom of messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  