import axios from "axios";

// Define your OpenAI API key
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Define a function to send a message to the ChatGPT model
export default async function sendInfluences(message) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // You can use the gpt-3.5-turbo model for most use cases
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

    // Extract and return the chatbot's reply
    const chatbotReply = response.data.choices[0].message.content;
    return chatbotReply;
  } catch (error) {
    console.error("Error sending message to ChatGPT:", error);
    throw error;
  }
}

// // Example usage
// async function main() {
//   const userMessage = "Tell me about the history of rock music.";
//   const chatbotReply = await sendInfluences(userMessage);
//   console.log("Chatbot Reply:", chatbotReply);
// }

// // Call the main function to interact with the chatbot
// main();
