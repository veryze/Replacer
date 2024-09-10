// input taken from replace.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "replaceText") {
        const { oldText, repText, isNotCaseSensitive } = message;

        const escapedOldText = oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regexFlags = isNotCaseSensitive ? 'g' : 'gi';
        const regex = new RegExp(escapedOldText, regexFlags);



        function replaceTextNodes(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const matches = [...node.textContent.matchAll(regex)];
                let newText = node.textContent;

                for (const match of matches) {
                    const matchedText = match[0];
                    const matchIndex = match.index;


                    if (isNotCaseSensitive) {

                        newText = newText.substring(0, matchIndex) + repText + newText.substring(matchIndex + matchedText.length);

                    } else {

                        // to keep case sensitive
                        const casePreservedText = repText.split('').map((char, i) => {
                            // ie. if matchedText has a character at position i, preserve case
                            return matchedText[i] && matchedText[i].toUpperCase() === matchedText[i]
                                ? char.toUpperCase()
                                : char.toLowerCase();
                        }).join('');

                        newText = newText.substring(0, matchIndex) + casePreservedText + newText.substring(matchIndex + matchedText.length);
                    } // end else

                } //end for

                node.textContent = newText;

            } else {
                // recursively goes through child nodes
                node.childNodes.forEach(replaceTextNodes);
            }
        }

        replaceTextNodes(document.body);
    } // end message listener
});