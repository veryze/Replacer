// helped by chatgpt and stackoverflow. otherwise, all code written by @veryze.





let isNotCaseSensitive = false;

document.querySelector('.switch input').addEventListener('change', function () {
  isNotCaseSensitive = this.checked;
});



document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('replaceButton').addEventListener('click', () => {
    var oldText = document.getElementById('oldText').value;
    var newText = document.getElementById('newText').value;

    if (!oldText || !newText) {
      alert('Please enter both old text and replacement text.');
      return;
  }

    var array = newText.split(", ").filter(text => text.trim() !== "");


    const min = 0;
    var max = array.length;

    var randomnumber = Math.floor(Math.random() * max);

    var repText = array[randomnumber];



    console.log('Old Text:', oldText);
    console.log('Replacement Text:', repText);



    // message sent to content.js

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'replaceText', oldText, repText, isNotCaseSensitive });
    });
  });
});