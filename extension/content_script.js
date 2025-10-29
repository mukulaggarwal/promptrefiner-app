(function() {
  function injectButton() {
    const buttons = document.querySelectorAll('button');
    let sendBtn = null;
    for (const btn of buttons) {
      const label = (btn.innerText || btn.textContent || '').trim().toLowerCase();
      if (label === 'send' || label === 'submit') {
        sendBtn = btn;
        break;
      }
    }
    if (sendBtn && !document.getElementById('prompt-refiner-btn')) {
      const refineBtn = document.createElement('button');
      refineBtn.id = 'prompt-refiner-btn';
      refineBtn.innerText = 'Refine Prompt';
      refineBtn.style.marginLeft = '8px';
      refineBtn.style.padding = '4px 8px';
      refineBtn.style.borderRadius = '6px';
      refineBtn.style.border = 'none';
      refineBtn.style.background = '#00c9ff';
      refineBtn.style.color = '#041e42';
      refineBtn.style.cursor = 'pointer';
      refineBtn.addEventListener('click', () => {
        const textarea = document.querySelector('textarea') || document.querySelector('input[type="text"]');
        if (!textarea) {
          alert('No prompt found!');
          return;
        }
        const prompt = textarea.value;
        chrome.runtime.sendMessage({ type: 'REFINE_PROMPT', prompt }, (response) => {
          if (response && response.refined) {
            textarea.value = response.refined;
          }
        });
      });
      sendBtn.parentNode.insertBefore(refineBtn, sendBtn.nextSibling);
    }
  }
  setInterval(injectButton, 2000);
})();
