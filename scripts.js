const chatBox = document.getElementById("chat-box");

function appendMessage(message, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById("user-input");
    const userText = input.value.trim();

    if (!userText) return; 

    appendMessage(userText, "user"); 
    input.value = "";

    try { 
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: userText})
        });

        const data = await response.json();
        appendMessage(data.reply, "bot");
    } catch (error) {
        appendMessage("Sorry, something went wrong.", "bot");
    }
    }
