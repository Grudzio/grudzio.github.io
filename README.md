<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jan Grudziński - Cybersecurity Engineer</title>
    <link rel="stylesheet" href="styles.css">
    <script>
        function switchLanguage(lang) {
            document.getElementById('pl').style.display = lang === 'pl' ? 'block' : 'none';
            document.getElementById('en').style.display = lang === 'en' ? 'block' : 'none';
        }
    </script>
</head>
<body onload="switchLanguage('en')">
    <button onclick="switchLanguage('pl')">PL</button>
    <button onclick="switchLanguage('en')">EN</button>
    <div id="pl" style="display: none;">
        <!-- Cała zawartość strony w języku polskim --><html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jan Grudziński - Inżynier Cyberbezpieczeństwa</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Jan Grudziński</h1>
        <h2>Inżynier Cyberbezpieczeństwa</h2>
    </header>
    <nav>
        <ul>
            <li><a href="#about">O mnie</a></li>
            <li><a href="#education">Edukacja</a></li>
            <li><a href="#contact">Kontakt</a></li>
        </ul>
    </nav>
    <main>
        <section id="about">
            <h2>O mnie</h2>
            <p>Jestem inżynierem cyberbezpieczeństwa z pasją do technologii i ciągłego uczenia się.</p>
        </section>
        <section id="education">
            <h2>Edukacja</h2>
            <p>Ukończyłem studia inżynierskie na Politechnice Warszawskiej na kierunku Telekomunikacja.</p>
            <script src="https://tryhackme.com/badge/2315388"></script>
        </section>
    </main>
    <footer>
        <section id="contact">
            <h2>Kontakt</h2>
            <p>Możesz się ze mną skontaktować poprzez email: jan.jakub.grudzinski@gmail.com</p>
        </section>
    </footer>
    <script src="main.js"></script>
</body>
</html>
    </div>
    <div id="en" style="display: none;">
        <!-- Cała zawartość strony w języku angielskim -->
    </div>
</body>
</html>