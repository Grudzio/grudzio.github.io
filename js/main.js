const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Tutaj powinna nastąpić weryfikacja danych logowania, np. porównanie z danymi w bazie danych

    if (username === 'admin' && password === 'password') {
        res.send('Zalogowano pomyślnie!');
    } else {
        res.send('Błędne dane logowania!');
    }
});

app.listen(3000, () => {
    console.log('Serwer działa na porcie 3000');
});