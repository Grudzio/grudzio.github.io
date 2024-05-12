document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Zapobiega domyślnej akcji formularza, czyli odświeżeniu strony

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest(); // Tworzy nowy obiekt XMLHttpRequest
    xhr.open('POST', '/login', true); // Inicjuje nowe żądanie POST do '/login'
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Ustawia typ zawartości na formularz zakodowany w URL

    xhr.onreadystatechange = function() { // Definiuje funkcję, która zostanie wywołana, gdy stan żądania się zmieni
        if (xhr.readyState == 4 && xhr.status == 200) { // Jeśli żądanie zostało zakończone i odpowiedź jest OK
            var response = JSON.parse(xhr.responseText); // Parsuje odpowiedź z serwera z formatu JSON na obiekt JavaScript

            if (response.message === 'Zalogowano pomyślnie!') {
                window.location.href = '/private-page.html'; // Przekierowuje na nową stronę
            } else if (response.message === 'Błędne dane logowania!') {
                alert('Błędne dane logowania!'); // Wyświetla komunikat o błędzie
            }
        }
    };

    xhr.send('username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)); // Wysyła żądanie do serwera z danymi formularza
});