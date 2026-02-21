// NEXT_PUBLIC_ prefix is required for the API key to be exposed to the client. This is a Next.js thing and it will only be exposed to Vercel at build time(?)
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Send a message to the ChatGPT model
export default async function sendInfluences(message) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a music history chatbot." },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error sending message to ChatGPT:", error);
    throw error;
  }
}
