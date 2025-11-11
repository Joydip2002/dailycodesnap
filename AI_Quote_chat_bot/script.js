const sendBtn = document.getElementById("send-btn");
const quoteBtn = document.getElementById("quote-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

const API_KEY = "YOUR_sk-proj-ruo6GC0UZQskEWY6CyQAHOcZFykytum4C5w61j54do2Fr-PzWuzsZSy2i0sBiOXWSr5rJDy43BT3BlbkFJI5SwBfBCeAY9LbR8QEIuRwTfnVoSJoYhlC-wGo_gtU3sn5SQsuF55uvZqNKTC7d7JKTFIij9MAOPENAI_API_KEY";

async function getAIResponse(message) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

sendBtn.addEventListener("click", async () => {
    const message = userInput.value;
    if (!message) return;
    addMessage("You", message);
    userInput.value = "";

    const reply = await getAIResponse(message);
    addMessage("AI", reply);
});

quoteBtn.addEventListener("click", async () => {
    const quotePrompt = "Give me a short motivational quote.";
    const quote = await getAIResponse(quotePrompt);
    addMessage("AI Quote", quote);
});

function addMessage(sender, text) {
    const msg = document.createElement("p");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}