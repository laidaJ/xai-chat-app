import readline from "readline";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "xai-zucxKFIaSYpdvCccfOfhe3LntZGSrhZveHqbAOZ0GVbui6SJSWNqnN4XaQPGZhTu6jIvMlPyMtdI4WDF", // Replace with your actual API key
  baseURL: "https://api.x.ai/v1",
});

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        { role: "system", content: "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy." },
        { role: "user", content: input }, // Use user input here
      ],
    });
    console.log(completion.choices[0].message);
  } catch (error) {
    console.error("Error:", error); // Handle errors appropriately
  } finally {
    userInterface.prompt(); // Ensure prompt appears even on errors
  }
});
