import { config } from "dotenv";
config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import SerpApi from "google-search-results-nodejs";

// ==============================
// 🔧 Gemini Setup
// ==============================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// ==============================
// 🔧 SerpAPI Setup
// ==============================
const searchClient = new SerpApi.GoogleSearch(
  process.env.SERPAPI_API_KEY
);

// Wrap SerpAPI in Promise for async/await
function searchGoogle(query) {
  return new Promise((resolve, reject) => {
    searchClient.json(
      {
        q: query,
        location: process.env.SERPAPI_LOCATION || "Canada",
        hl: "en",
        gl: "ca",
      },
      (data) => {
        if (!data) {
          reject("No data from SerpAPI");
          return;
        }

        const results = data.organic_results?.slice(0, 5) || [];

        const formatted = results.map((r, i) => ({
          position: i + 1,
          title: r.title,
          snippet: r.snippet,
          link: r.link,
        }));

        resolve(formatted);
      }
    );
  });
}

// ==============================
// 🤖 Agent Logic (Simple Orchestration)
// ==============================
async function runAgent(question) {
  console.log("🔍 Searching for:", question);

  // Step 1: Get search results
  const searchResults = await searchGoogle(question);

  console.log("📊 Search Results:", searchResults);

  // Step 2: Send to Gemini
  const prompt = `
You are an AI assistant.

Use the following real-time search results to answer the question accurately.

Search Results:
${JSON.stringify(searchResults, null, 2)}

Question:
${question}

Instructions:
- Provide a clear, concise answer
- Use the search results as primary source
- If needed, summarize multiple sources
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

// ==============================
// 🚀 Run
// ==============================
(async () => {
  try {
    console.log("🚀 Agent starting...\n");

    const question = "What is the capital of France?";

    const answer = await runAgent(question);

    console.log("\n✅ Final Answer:\n");
    console.log(answer);
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();