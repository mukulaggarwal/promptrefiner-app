chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.type === 'REFINE_PROMPT') {
    const payload = {
      user_id: 'default',
      prompt: message.prompt,
      history: []
    };
    fetch('http://localhost:8000/refine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        sendResponse({ refined: data.refined_prompt });
      })
      .catch(() => {
        sendResponse({ refined: message.prompt });
      });
    return true;
  }
});
