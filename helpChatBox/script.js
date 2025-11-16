const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatBody = document.getElementById("chatBody");
const msgInput = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");

chatToggle.onclick = () => {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
};

sendBtn.onclick = () => {
    if (msgInput.value.trim() === "") return;

    const msg = document.createElement("div");
    msg.className = "msg";
    msg.textContent = msgInput.value;
    chatBody.appendChild(msg);
    msgInput.value = "";

    chatBody.scrollTop = chatBody.scrollHeight;
};



















