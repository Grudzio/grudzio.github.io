# Przegląd i refaktoryzacja kodu – grudzio.github.io

**Data przeglądu:** 2026-02-19  
**Przeprowadził:** Antigravity  
**Kontekst:** Strona osobista / wizytówka CV inżyniera telekomunikacji z zainteresowaniami w cybersecurity. Kod powinien być przykładem profesjonalizmu i dobrej praktyki.

---

## 1. Plik `css/styles.css` – Zombie (usunięty)

### ❌ Co było złe
W katalogu `css/` znajdowały się dwa pliki:
- `style.css` – aktywny, główny, dobrze napisany
- `styles.css` – stary szkielet z innej wersji strony (jasny motyw, Roboto, styl Bootstrap-like)

Plik `styles.css` **nie był linkowany** w żadnym pliku HTML, więc technicznie niczego nie psuł. Jednak:
- Dla każdego, kto przejrzy repozytorium (a rekruter MOŻE to zrobić), wygląda jak bałagan i brak dbałości o porządek.
- Świadczy o tym, że kod nie był regularnie czyszczony.
- Zawiera sprzeczne definicje (jasny motyw vs. dark mode) – gdyby ktoś przypadkowo go podlinkował, strona by się "rozpadła".

### ✅ Jak naprawiono
Plik `styles.css` został **usunięty**. W projekcie pozostał jeden, jednoznaczny plik CSS.

---

## 2. Literówka w kluczu `localStorage` – Bug (naprawiony)

### ❌ Co było złe
W pliku `js/main.js` klucz localStorage był zapisany jako `'cookieConcent'` zamiast prawidłowego `'cookieConsent'`.

```js
// BYŁO (błąd):
localStorage.getItem('cookieConcent');
localStorage.setItem('cookieConcent', 'granted');
```

**Dlaczego to jest poważne:** Cały mechanizm zarządzania zgodą na cookies (GDPR Consent Mode) opiera się na tym kluczu. Jeśli klucz jest błędnie zapisany, to:
- W każdej kolejnej wersji kodu, gdyby ktoś użył poprawnej nazwy `'cookieConsent'`, zgoda nigdy by się nie wczytała.
- Użytkownik, który już raz kliknął "Zgadzam się", przy kolejnej wizycie **znów zobaczyłby banner** – bo klucz nie pasuje.
- Z perspektywy RODO/GDPR: banner byłby wyświetlany nieskończenie lub dane by znikały, co jest nierzetelnym podejściem do zarządzania zgodą.

Literówka w zmiennej biznesowej (consent) to kategoria błędu, który może kosztować poważne problemy prawne lub reputacyjne.

### ✅ Jak naprawiono
Poprawiono klucz na `'cookieConsent'` we wszystkich miejscach w `main.js`.

```js
// JEST (poprawnie):
localStorage.getItem('cookieConsent');
localStorage.setItem('cookieConsent', 'granted');
```

---

## 3. Zduplikowany komentarz w `main.js` – Brud kodu (usunięty)

### ❌ Co było złe
```js
// Load the GTM Script dynamically
// Load the GTM Script dynamically  ← identyczna linia dwa razy z rzędu
const gaScript = document.createElement('script');
```

To błahy, ale widoczny sygnał copy-paste bez weryfikacji. Dla programisty przeglądającego kod (np. rekrutera technicznego) świadczy o braku uwagi do szczegółów.

### ✅ Jak naprawiono
Usunięto zduplikowaną linię komentarza.

---

## 4. Brak `rel="noopener noreferrer"` na linkach zewnętrznych – Luka bezpieczeństwa (naprawiona)

### ❌ Co było złe
Wszystkie linki zewnętrzne (`target="_blank"`) nie miały atrybutu `rel="noopener noreferrer"`:

```html
<!-- BYŁO (niebezpieczne): -->
<a href="https://mozaikamagazine.eu" target="_blank" class="btn-sm">...
<a href="https://github.com/Grudzio" target="_blank" class="social-btn github">...
```

**Dlaczego to jest niebezpieczne – atak "reverse tabnapping":**
Gdy użytkownik kliknie link otwierający się w nowej karcie (`target="_blank"`), otwarta strona otrzymuje dostęp do obiektu `window.opener` – czyli referencji do oryginalnego okna Twojej strony. Złośliwa lub skompromitowana strona trzecia może wtedy:
1. `window.opener.location = 'https://phishing-site.com'` – **podmienić** URL Twojej strony na stronę phishingową, podczas gdy użytkownik patrzy na nową kartę.
2. Przeczytać pewne informacje o Twoim oknie.

To szczególnie kompromitujące dla Ciebie jako osoby deklarującej zainteresowanie **cyberbezpieczeństwem** – ta luka jest wymieniana na listach OWASP i w każdym kursie web security (TryHackMe też ją omawia).

`noopener` – blokuje dostęp do `window.opener`.  
`noreferrer` – dodatkowo nie wysyła nagłówka `Referer` do strony docelowej (dodatkowa prywatność).

Dotyczyło to 5 linków: mozaikamagazine.eu, cleverinvestment.pl, LinkedIn, GitHub, TryHackMe.

### ✅ Jak naprawiono
Dodano `rel="noopener noreferrer"` do wszystkich linków z `target="_blank"`.

```html
<!-- JEST (bezpiecznie): -->
<a href="https://mozaikamagazine.eu" target="_blank" rel="noopener noreferrer" ...>
```

---

## 5. Nieprawidłowe zagnieżdżenie HTML: `<p>` wokół `<ul>` – Błąd specyfikacji (naprawiony)

### ❌ Co było złe
```html
<!-- BYŁO (nieprawidłowe): -->
<p>
  <ul>
    <li>Wsparcie techniczne...</li>
  </ul>
</p>
```

Według specyfikacji HTML5, element `<p>` jest **elementem frazowania** (inline-level) i nie może zawierać **elementów blokowych** takich jak `<ul>`. Przeglądarki naprawiają to automatycznie, ale w sposób nieprzewidywalny – parser HTML5 zamknie `<p>` przed `<ul>`, co może tworzyć puste, "porzucone" elementy w DOM. Walidator W3C zgłasza to jako błąd.

Dla osoby deklarującej kompetencje webowe – błąd w strukturze HTML jest jak błąd ortograficzny w CV.

### ✅ Jak naprawiono
Usunięto zbędne `<p>` owijające `<ul>`. Lista stoi samodzielnie, co jest poprawne.

```html
<!-- JEST (poprawnie): -->
<ul>
  <li>Wsparcie techniczne...</li>
</ul>
```

---

## 6. Inline `style` w HTML – Anty-wzorzec (naprawiony)

### ❌ Co było złe
```html
<!-- BYŁO: -->
<a ... class="social-btn tryhackme" style="border: 1px solid #fff;">
```

Style inline w HTML naruszają zasadę **separacji warstw** (Separation of Concerns):
- HTML = struktura
- CSS = wygląd
- JS = zachowanie

Utrudniają maintenance – jeśli chcesz zmienić kolor, musisz go szukać w HTML, a nie w CSS. Mają też wyższy specificity niż klasy CSS, co może powodować trudne do debugowania konflikty stylów. Jeden `style=""` to "zapach kodu" (code smell) – sugeruje, że autor nie wiedział jak prawidłowo rozbudować arkusz CSS.

### ✅ Jak naprawiono
Usunięto atrybut `style` z HTML. Dodano dedykowaną regułę w `css/style.css`:

```css
.social-btn.tryhackme {
    border: 1px solid #fff;
}
```

---

## 7. Brak tagu `<favicon>` – Brak podstawy profesjonalizmu (dodany)

### ❌ Co było złe
Strona nie miała zdefiniowanej ikony (favicon). Efekty:
- W zakładce przeglądarki widoczna jest generyczna szara ikona.
- Gdy ktoś doda stronę do zakładek, nie ma identyfikowalnej ikony.
- Favicon to absolutne minimum każdej strony, która ma wyglądać profesjonalnie. Jego brak to jak CV bez zdjęcia nagłówkowego – technicznie ok, ale wrażenie niedokończenia.

### ✅ Jak naprawiono
Stworzono plik `favicon.svg` z inicjałami "JG" w stylu dopasowanym do palety strony (niebieski akcent, ciemne tło). Dodano linki `<link rel="icon">` w obu plikach HTML.

---

## 8. Brak Open Graph meta tagów – Brak obecności w social media (dodane)

### ❌ Co było złe
Nie było żadnych tagów `<meta property="og:*">`. Efekt:
- Gdy ktoś udostępni link do strony na LinkedIn, Facebooku, Slacku, Twitterze/X – platforma nie wie jak wyświetlić preview. Pojawi się brzydkie, puste okno bez tytułu i opisu.
- Dla strony **wizytówki CV**, którą przesyłasz rekruterom przez LinkedIn, to duży problem wizerunkowy.
- Brak `og:image` oznacza brak obrazka przy udostępnianiu.

### ✅ Jak naprawiono
Dodano kompletny zestaw Open Graph tagów do `<head>` w `index.html`:
```html
<meta property="og:title" content="Jan Grudziński | IT Specialist & Telecom Engineer">
<meta property="og:description" content="...">
<meta property="og:image" content="https://grudzio.github.io/profile.jpg">
<meta property="og:url" content="https://grudzio.github.io">
<meta property="og:type" content="website">
```
Użyto zdjęcia profilowego jako obrazka OG – to naturalne i spójne rozwiązanie.

---

## 9. `document.write()` w `privacy.html` – Przestarzałe API (naprawione)

### ❌ Co było złe
```html
<!-- BYŁO: -->
<script>document.write(new Date().toLocaleDateString());</script>
```

`document.write()` to API z lat 90., długo przed standaryzacją DOM. Jest oznaczone jako deprecated w specyfikacji HTML Living Standard i odradza się jego użycia z kilku powodów:
- Jeśli zostanie wywołane po załadowaniu strony (np. przez lazy loading), **czyści całą stronę**.
- Blokuje parser HTML (synchroniczne), co szkodzi wydajności.
- Nowoczesne narzędzia (Lighthouse, PageSpeed) flagują je jako problem.
- Chrome DevTools wyświetla ostrzeżenie w konsoli.

Dla strony, która ma pokazywać kompetencje webowe – użycie `document.write` to sygnał ostrzegawczy dla technicznego rekrutera.

### ✅ Jak naprawiono
Zastąpiono nowoczesnym podejściem: pusty `<span id="last-updated">` + `textContent` w JavaScript:

```html
<!-- JEST: -->
<span id="last-updated"></span>
<script>
  document.getElementById('last-updated').textContent = new Date().toLocaleDateString('pl-PL');
</script>
```

Dodano też `'pl-PL'` jako locale – data wyświetla się w formacie polskim (dd.mm.rrrr), a nie angielskim (m/d/yyyy).

---

## Podsumowanie zmian

| # | Plik | Problem | Kategoria | Status |
|---|------|---------|-----------|--------|
| 1 | `css/styles.css` | Zombie file | Architektura | ✅ Usunięty |
| 2 | `js/main.js` | Literówka `cookieConcent` | Bug / RODO | ✅ Naprawiony |
| 3 | `js/main.js` | Zduplikowany komentarz | Jakość kodu | ✅ Usunięty |
| 4 | `index.html` + `privacy.html` | Brak `noopener noreferrer` | Bezpieczeństwo | ✅ Naprawiony |
| 5 | `index.html` | `<p>` owijający `<ul>` | HTML validity | ✅ Naprawiony |
| 6 | `index.html` | Inline `style=""` | Architektura CSS | ✅ Przeniesiony do CSS |
| 7 | `index.html` + `privacy.html` | Brak favicon | UX / Profesjonalizm | ✅ Dodany |
| 8 | `index.html` | Brak Open Graph tagów | SEO / Social Media | ✅ Dodane |
| 9 | `privacy.html` | `document.write()` | Przestarzałe API | ✅ Naprawiony |
