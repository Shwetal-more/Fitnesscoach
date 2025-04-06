
const chatContainer = document.getElementById("chatContainer");
const textbox = document.getElementById("textbox");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("mic-button");
const historyBtn = document.getElementById("historyBtn");

function addMessage(message, className) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", className);
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function displayHistory(history) {
  chatContainer.innerHTML = "";
  history.forEach(item => {
    addMessage(item.user_input, "user");
    addMessage(item.response, "bot");
  });
}

sendBtn.onclick = async () => {
  const userMessage = textbox.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, "user");
  textbox.value = "";

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
      credentials: "include"
    });

    const data = await response.json();
    addMessage(data.reply, "bot");
  } catch (error) {
    addMessage("Error talking to chatbot.", "bot");
  }
};

historyBtn.onclick = async () => {
  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "show history" }),
      credentials: "include"
    });

    const data = await response.json();
    displayHistory(data.history || []);
  } catch (error) {
    addMessage("Couldn't load history", "bot");
  }
};

micBtn.onclick = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    const voiceInput = event.results[0][0].transcript;
    textbox.value = voiceInput;
    sendBtn.click();
  };
};