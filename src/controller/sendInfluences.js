import axios from "axios";

// NEXT_PUBLIC_ prefix is required for the API key to be exposed to the client. This is a Next.js thing and it will only be exposed to Vercel at build time(?)
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Send a message to the ChatGPT model
export default async function sendInfluences(message) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a music history chatbot.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const chatbotReply = response.data.choices[0].message.content;
    return chatbotReply;
  } catch (error) {
    console.error("Error sending message to ChatGPT:", error);
    throw error;
  }
}
