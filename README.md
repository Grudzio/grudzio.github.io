<!DOCTYPE html>
<html lang="en">
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
    <div id="pl">
        <!-- CaÅa zawartoÅÄ strony w jÄzyku polskim -->
        <header>
            <h1>Jan GrudziÅski</h1>
            <h2>InÅ¼ynier CyberbezpieczeÅstwa</h2>
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
                <p>Jestem inÅ¼ynierem cyberbezpieczeÅstwa z pasjÄ do technologii i ciÄgÅego uczenia siÄ.</p>
            </section>
            <section id="education">
                <h2>Edukacja</h2>
                <p>UkoÅczyÅem studia inÅ¼ynierskie na Politechnice Warszawskiej na kierunku Telekomunikacja.</p>
                <script src="https://tryhackme.com/badge/2315388"></script>
            </section>
        </main>
        <footer>
            <section id="contact">
                <h2>Kontakt</h2>
                <p>MoÅ¼esz siÄ ze mnÄ skontaktowaÄ poprzez email: jan.jakub.grudzinski@gmail.com</p>
            </section>
        </footer>
    </div>
    <div id="en" style="display: none;">
        <!-- CaÅa zawartoÅÄ strony w jÄzyku angielskim -->
        <header>
            <h1>Jan GrudziÅski</h1>
            <h2>Cybersecurity Engineer</h2>
        </header>
        <nav>
            <ul>
                <li><a href="#about">About Me</a></li>
                <li><a href="#education">Education</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
        <main>
            <section id="about">
                <h2>About Me</h2>
                <p>I am a cybersecurity engineer with a passion for technology and continuous learning.</p>
            </section>
            <section id="education">
                <h2>Education</h2>
                <p>I graduated with a degree in Telecommunications from the Warsaw University of Technology.</p>
                <script src="https://tryhackme.com/badge/2315388"></script>
            </section>
        </main>
        <footer>
            <section id="contact">
                <h2>Contact</h2>
                <p>You can reach me via email: jan.jakub.grudzinski@gmail.com</p>
            </section>
        </footer>
    </div>
    <script src="main.js"></script>
</body>
</html>
