# PromptRefiner

PromptRefiner is a full stack project that helps you write better prompts for large language models (LLMs) like ChatGPT, Perplexity, Claude, Grok and DeepSeek.  It consists of a Chrome extension, a small backend service and a marketing website.  The goal is to insert a **Refine Prompt** button next to any LLM chat interface.  When clicked, the extension calls your backend to improve the text using a vendor‑agnostic LLM agent, replaces the draft with the refined prompt, and lets you send it.

## Repository structure

```
.
├── backend/            # Python Flask API for prompt refinement
│   ├── app.py          # /refine endpoint and basic LLM integration
│   └── requirements.txt# Python dependencies
├── extension/          # Chrome extension source
│   ├── manifest.json   # manifest v3 configuration
│   ├── content_script.js # injects the refine button into chat UIs
│   └── background.js   # handles messages and calls backend
├── website/            # One‑page marketing site
│   ├── index.html      # Landing page markup
│   ├── style.css       # Modern responsive styles
│   └── script.js       # Minimal interactivity for the contact form
└── README.md           # This file
```

## Features

- **Universal injection** – the extension detects the Send button on any LLM chat site and inserts a **Refine Prompt** button next to it.
- **Backend refinement** – your prompt and recent chat history are sent to a backend API that calls an LLM agent to suggest improvements.
- **Three pricing tiers**
  - **Basic (free)** – 20 refinements/day.
  - **Pro – \$5/month** – 50 refinements/day with additional context retention.
  - **Premium – \$15/month** – 200 refinements/day and higher throughput.
- **Privacy focused** – only the minimum context necessary is sent to the backend; data is encrypted in transit and can be discarded after processing.
- **Easy to run locally** – start the Flask API, load the extension in developer mode and open the website to learn more.

## Getting started

### 1. Clone the repository

```
git clone https://github.com/mukulaggrawal/promptrefiner-app.git
cd promptrefiner-app
```

### 2. Run the backend

The backend is a simple Flask service that exposes a single `/refine` endpoint.  It expects a JSON payload containing:

- `user_id`: a string or number identifying the user (for rate limiting/tier management).
- `prompt`: the draft prompt text.
- `history`: an array of previous messages (strings) from the chat history.

It returns a JSON object with a `prompt` field containing the refined text.

Install dependencies (Python 3.10+ recommended):

```
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

By default the service runs on `http://localhost:8000`.  You can test it with cURL:

```
curl -X POST http://localhost:8000/refine -H "Content-Type: application/json" \
  -d '{"user_id": "123", "prompt": "What is AI?", "history": ["Hi", "Tell me about AI"]}'
```

The response will be something like:

```json
{"prompt": "Please provide a clear and detailed answer to the following question: What is AI?"}
```

You can replace the simple template in `app.py` with your own call to OpenAI, Anthropic or any other model.

### 3. Load the Chrome extension

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked** and select the `extension` folder from this repository.
4. Navigate to your favourite LLM site (ChatGPT, Perplexity, Claude, Grok, etc.).
5. Start typing a prompt.  You should see a **Refine Prompt** button appear next to the Send button.  Clicking it will call your local backend at `http://localhost:8000/refine` and replace the draft with the refined version.

You can customise which sites are matched by editing the `matches` field in `extension/manifest.json`.

### 4. View the website

The `website` directory contains a modern one‑page marketing site built with plain HTML, CSS and JavaScript.  To preview it locally, you can simply open `website/index.html` in your browser or serve it via a simple HTTP server:

```
cd website
python -m http.server 9000
```

Then visit `http://localhost:9000` in your browser.  The site includes sections for a hero banner, features, pricing plans, about information and a contact form.  The Pro tier is highlighted as the recommended plan.  Feel free to customise the copy, colours or add tracking scripts as needed.

## Deployment considerations

- **Backend**: Host the Flask API on a platform like Heroku, Render or an AWS/Google VM.  Secure it with HTTPS and authentication as appropriate.  Replace the simple prompt template with actual LLM calls and incorporate tier limits.
- **Extension**: Once stable, publish the extension on the Chrome Web Store.  Ensure the backend URL points to your deployed API rather than `localhost`.
- **Website**: Deploy the static site on Vercel, Netlify or GitHub Pages.  Update pricing details and add CTA links to your payment provider.

## License

This project is provided under the MIT License.  See the `LICENSE` file for details.

## Acknowledgements

Built using open source tools including [Flask](https://flask.palletsprojects.com/), [Chrome Extensions API](https://developer.chrome.com/docs/extensions/), [Font Awesome](https://fontawesome.com/) icons and Google Fonts.  The design draws inspiration from modern AI product sites.
