---
description: Generuje opis wprowadzonych zmian (commit message) do akceptacji
---

# Generowanie opisu zmian (Commit Message)

// turbo-all

1. Uruchom polecenie `git status -s`, aby zidentyfikować, jakie pliki uległy modyfikacji.
2. Sprawdź dokładną treść modyfikacji poprzez polecenie `git diff --cached` (dla dodanych do stage) a następnie `git diff` (dla jeszcze nie dodanych zmian). Jeśli nie ma skonfigurowanego powiązania z lokalnym Git, to spróbuj odczytać za pomocą historii lub z samej konwersacji.
3. Przeanalizuj historię naszej obecnej konwersacji (swoje taski, notatki, moją komunikację), aby dokładnie zrozumieć kontekst i cel techniczny/biznesowy prowadzonych prac.
4. Na postawie zebranych z plików diffów i z rozmowy informacji zredaguj merytoryczny i zwięzły opis zmian wzorowany na konwencji "Conventional Commits" (jak np. `feat:`, `fix:`, `docs:`, `style:`, `refactor:` itd.).
5. Używaj języka polskiego przy opisywaniu wprowadzonych funkcjonalności lub poprawek.
6. Zaprezentuj mi stworzony i sformatowany tekst opisu w formie przygotowanej do skopiowania i poproś o moją akceptację lub zasygnalizowanie uwag czy poprawek.
