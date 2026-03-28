# langchain-chain-gemini

# 1. Upgrade python
/Library/Developer/CommandLineTools/usr/bin/python3 -m pip install --upgrade pip

# 2. Add python to path
sudo vi ~/.zshrc 
export PATH="/Users/{user}/Library/Python/3.9/bin:$PATH"
export PATH="/usr/local/bin:$PATH"

# 3. Validate python version
pip3 --version

# 4. Install langchain libraries
npm install @langchain/openai @langchain/core
npm install @langchain/google-genai
npm install dotenv
npm install -D nodemon
npm i serpapi
npm i n8n-nodes-scraping-dog
npm install @langchain/google-genai
npm install @google/generative-ai serpapi dotenv
npm install google-search-results-nodejs

# 5. Clean npm cache
npm cache clean --force

# 6. Provide your Google Gemini in env file
GEMINI_API_KEY={{GEMINI_API_KEY}}
SERPAPI_API_KEY={{SERPAPI_API_KEY}}
SERPAPI_LOCATION={{SERPAPI_LOCATION}}

# 7. Run the project
node agent.js
