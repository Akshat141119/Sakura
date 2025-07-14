
export async function getPoeticReflection(userPrompt, mood = "gentle") {
  try {
    const response = await fetch("https://dull-crabs-hug.loca.lt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openchat", // you can use "gemma", "llama2", "mistral", etc.
        prompt: `"Generate a creative but natural-sounding question that feels personal, emotionally thoughtful, or lightly philosophical. Avoid abstract poetry—aim for something a curious friend might ask during a walk under cherry blossoms.". Mood: ${mood}. Question: ${userPrompt}`,
        stream: false
      })
    });

    const result = await response.json();
    console.log("🧾 Local Sakura Response:", result);

    if (result?.response) {
      return { message: { content: result.response } };
    } else {
      return {
        message: {
          content: "🍃 The spirit stirred, but no verse returned from the breeze."
        }
      };
    }
  } catch (err) {
    console.error("🌫️ Spirit fetch error:", err);
    return {
      message: {
        content: "🌫️ The wind carried nothing — a silence born from the mist."
      }
    };
  }
}
