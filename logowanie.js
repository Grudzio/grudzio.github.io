async function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            // Obsługa tokenu sesji lub przekierowanie użytkownika
            console.log('Login successful:', data);
            window.location.href = '/private-page.html';
        } else {
            console.error('Login failed:', response.statusText);
            alert('Invalid username or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
    }
}

// Podpięcie funkcji do formularza logowania
document.querySelector('form').addEventListener('submit', login);