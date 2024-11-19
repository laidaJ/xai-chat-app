document.getElementById('sendButton').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value;
  const responseDiv = document.getElementById('response');

  if (!userInput.trim()) {
    responseDiv.textContent = 'Please type a message.';
    return;
  }

  responseDiv.textContent = 'Loading...';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    console.log(response)
    responseDiv.textContent = data.reply;
  } catch (error) {
    console.error('Error:', error);
    responseDiv.textContent = 'Error: Unable to get a response.';
  }
});

