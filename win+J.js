const tg = window.Telegram.WebApp;
tg.expand(); // Expand to full-screen

document.getElementById("questionForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    let userQuestion = document.getElementById("userQuestion").value.trim();
    if (!userQuestion) return;

    document.getElementById("responseContainer").innerHTML = "Thinking...";

    // OpenAI API Key (replace with your key)
    const apiKey = "YOUR_OPENAI_API_KEY";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: userQuestion }]
        })
    });

    const result = await response.json();
    const answer = result.choices?.[0]?.message?.content || "Error: No response";

    // Generate Image (Replace with a real API if needed)
    const imageUrl = `https://source.unsplash.com/300x200/?science,universe,space`;

    // Display Answer
    document.getElementById("responseContainer").innerHTML = `
        <p><strong>Answer:</strong> ${answer}</p>
        <img src="${imageUrl}" class="response-img">
    `;

    // Save to History
    let historyList = document.getElementById("history");
    let listItem = document.createElement("li");
    listItem.textContent = userQuestion;
    historyList.appendChild(listItem);

    // Clear Input
    document.getElementById("userQuestion").value = "";
});