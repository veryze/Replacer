// input taken from replace.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "replaceText") {
      const { oldText, repText } = message;
      
      const escapedOldText = oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedOldText, 'gi'); 
      
      function replaceTextNodes(node) {
          if (node.nodeType === Node.TEXT_NODE) {
              const matches = [...node.textContent.matchAll(regex)];
              let newText = node.textContent;
              
              for (const match of matches) {
                  const matchedText = match[0];
                  const matchIndex = match.index;
                  

                  // to keep case sensitive
                  const casePreservedText = repText.split('').map((char, i) => {
                    // ie. if matchedText has a character at position i, preserve case
                    return matchedText[i] && matchedText[i].toUpperCase() === matchedText[i]
                        ? char.toUpperCase()
                        : char.toLowerCase();
                }).join('');
                  
                  newText = newText.substring(0, matchIndex) + casePreservedText + newText.substring(matchIndex + matchedText.length);
              }
              
              node.textContent = newText;
          } else {
              node.childNodes.forEach(replaceTextNodes);
          }
      }
      
      replaceTextNodes(document.body);
  }
});