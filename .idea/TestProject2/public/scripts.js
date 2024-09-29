document.getElementById('generateButton').addEventListener('click', async () => {
    const promptInput = document.getElementById('promptInput').value; // Get the user input
    const responseDiv = document.getElementById('response'); // Get the response display area

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: promptInput }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the JSON response

        // Display the generated content in the response div
        responseDiv.textContent = data.response; // Update to show the response from AI
    } catch (error) {
        console.error('Error:', error);
        responseDiv.textContent = 'Error: ' + error.message; // Display error message
    }
});
