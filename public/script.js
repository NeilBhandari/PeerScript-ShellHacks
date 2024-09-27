document.getElementById('generateButton').addEventListener('click', async () => {
    const prompt = document.getElementById('promptInput').value;
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const result = await response.json(); // Parse JSON response
        document.getElementById('response').innerText = result.response; // Display the response text

    } catch (error) {
        document.getElementById('response').innerText = `Server error: ${error.message}`;
    }
});
