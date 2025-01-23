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

let messages = [
  {
    role: "system",
    content: "You are a chat negotiates deals for real estate.",
  },
];

document.getElementById("sendMessageButton").addEventListener("click", sendMessage);
document.getElementById("chatInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();

  if (message) {
    addMessage(message, "user");
    input.value = "";

    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
      });

      const data = await response.json();
      let aiResponse = data.response;

      // Remove the first three points
      aiResponse = removeFirstThreePoints(aiResponse);

      // Format the response to add points on alternate lines
      aiResponse = formatAlternateLines(aiResponse);

      addMessage(aiResponse, "ai");
      console.log(aiResponse);
    } catch (error) {
      console.error("Error:", error);
      addMessage("Oops! There was an error processing your request.", "ai");
    }
  }
}

function addMessage(text, sender) {
  const messagesContainer = document.getElementById("messages");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.innerHTML = text;
  messagesContainer.appendChild(messageElement);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeFirstThreePoints(response) {
  const lines = response.split("\n").filter(line => line.trim() !== "");
  
  // Remove the first three points
  const filteredLines = lines.slice(3);

  return filteredLines.join("\n");
}

function formatAlternateLines(response) {
  const lines = response.split("\n").filter(line => line.trim() !== "");
  
  let formattedResponse = "";
  
  lines.forEach((line, index) => {
    if (index > 0) formattedResponse += "<br><br>"; // Add a blank line between points
    formattedResponse += line;
  });

  return formattedResponse;
}
