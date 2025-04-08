document.addEventListener("DOMContentLoaded", function () {
  fetch("/get_random_data")
    .then((response) => response.json())
    .then((data) => {
      let tableBody = document.getElementById("dataset-table");
      tableBody.innerHTML = ""; // Clear previous data

      if (data.error) {
        tableBody.innerHTML = "<tr><td colspan='2'>No data available</td></tr>";
        return;
      }

      data.forEach((row) => {
        let newRow = `<tr><td>${row.question}</td><td>${row.answer}</td></tr>`;
        tableBody.innerHTML += newRow;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function sendMessage() {
  let userInput = document.getElementById("user-input").value.trim();

  if (userInput === "") return;

  let chatHistory = document.getElementById("chat-history");

  // Add user message
  let userMessage = `<div class="chat-bubble user-message">${userInput}</div>`;
  chatHistory.innerHTML += userMessage;

  // Show bot is typing
  let botTyping = `<div class="chat-bubble bot-message" id="bot-typing">Typing...</div>`;
  chatHistory.innerHTML += botTyping;

  // Scroll to bottom
  chatHistory.scrollTop = chatHistory.scrollHeight;

  fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("bot-typing").remove(); // Remove "Typing..." message

      let botMessage = `<div class="chat-bubble bot-message">${data.answer}</div>`;
      chatHistory.innerHTML += botMessage;

      chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll
    })
    .catch((error) => console.error("Error:", error));

  // Clear input
  document.getElementById("user-input").value = "";
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}
