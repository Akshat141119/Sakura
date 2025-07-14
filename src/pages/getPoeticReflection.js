export async function getPoeticReflection(userPrompt) {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a poetic Sakura spirit. Respond in soft, metaphorical, emotionally reflective language. Every reply feels like a breeze through petals."
          },
          {
            role: "user",
            content: userPrompt
          }
        ],
        temperature: 0.8,
        max_tokens: 120
      })
    });

    const result = await response.json();

    if (result?.choices?.[0]?.message?.content) {
      return { message: result.choices[0].message };
    } else {
      return { error: result?.error || "Unexpected error", success: false };
    }
  } catch (err) {
    console.error("OpenAI whisper failed:", err);
    return { error: err.message, success: false };
  }
}