// helped by chatgpt and stackoverflow. otherwise, all code written by @veryze.



document.addEventListener('DOMContentLoaded', () => {document.getElementById('replaceButton').addEventListener('click', () => {
  var oldText = document.getElementById('oldText').value;
  var newText = document.getElementById('newText').value;

  var array = newText.split(", ").filter(text => text.trim() !== "");
  
  if (array.length === 0) {
    console.error('The replacement text array is empty.');
    array.push(oldText);
  }

  const min = 0;
  var max = array.length;

  var randomnumber = Math.floor(Math.random() * max);

  var repText = array[randomnumber];


  
  console.log('Old Text:', oldText);
  console.log('Replacement Text:', repText);



  // message sent to content.js

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'replaceText', oldText, repText });
  });
});
});