# 📖 Kompletna Instrukcja Zarządzania Stroną (Sanity CMS)

Witamy w panelu zarządzania Twoim nowym serwisem! Cała konfiguracja wyglądu (kolory, nazwy) oraz zarządzanie treścią (mecze, skład, akademia, zarząd) znajduje się w jednym wygodnym miejscu. 

Aby wejść do panelu:
1. Przejdź pod adres: `twoja-domena.pl/studio` (lub `http://localhost:3000/studio` lokalnie).
2. Zaloguj się.
3. Korzystaj z lewego menu nawigacyjnego.

Poniżej znajdziesz szczegółowe wyjaśnienie każdego elementu w panelu.

---

## 🎨 1. Ustawienia Główne (Kolory i Nazwy)
*Gdzie szukać: Lewe menu -> `⚙️ Ustawienia Główne (Site Settings)`*

To tutaj kontrolujesz wygląd całej strony. Panel podzielony jest na wygodne zakładki (u góry ekranu):

* **Podstawowe:** 
  * Wpisz **Nazwę Klubu** i wgraj **Logo**. Logo pojawi się w lewym górnym rogu strony.
  * Zbuduj **Główne Menu** – dodawaj tu linki do zakładek takich jak "Mecze", "Klub", "Sklep".
* **Kolory & Motyw:**
  * **Główny Kolor Akcentu:** Najważniejszy kolor. Podaj w formacie HEX (np. `#FF0000`). Zmieni to od razu kolory ikon, podświetleń i głównych przycisków.
  * **Drugi Kolor Tekstu (Akcent):** Zmienia wybrane słowa (np. zółty tekst w nagłówkach).
  * **Kolor Tła / Header / Stopka:** Ustal barwy teł dla całej witryny.
  * **Dekoracje:** Włącz lub wyłącz nowoczesne ukośne paski na stronie i ustal ich niezależny kolor.
* **Sekcja Główna (Hero):**
  * Ustaw duże zdjęcie u góry strony startowej, główny napis powitalny oraz krótszy opis.
* **Przyciski:**
  * Każdy z głównych przycisków ("Dołącz do klubu", "Czytaj więcej", "Newsletter") może mieć własny unikalny kolor. Jeśli zostawisz pole puste, przycisk użyje "Głównego Koloru Akcentu".
* **Tytuły Sekcji:**
  * **Nazwy:** Nie podoba Ci się słowo "AKTUALNOŚCI"? Wpisz tu "Z Życia Klubu". Zmieni się to automatycznie na stronie!
  * **Kolory:** Przypisz indywidualny kolor dla napisu "Aktualności", a inny dla napisu "Sponsorzy".

> **Ważne:** Zmiany w Ustawieniach Głównych (Site Settings) nie wymagają tworzenia nowych wpisów – po prostu edytuj, kliknij **Publish** i odśwież stronę.

---

## ⚽ 2. Klub (Rozgrywki i Tabela)
*Gdzie szukać: Lewe menu -> folder `⚽ Klub (Rozgrywki i Skład)`*

Rozwiń ten folder by zarządzać ligą i meczami.
* **Mecze & Wyniki:** Kliknij "Create new", podaj nazwę przeciwnika (oraz krótki skrót np. LEG), ustal datę i zaznacz czy grasz u siebie (Is Home). Jeśli mecz się skończył, zmień Status na `Finished` i wpisz bramki. Te dane same zasilą tabelę!
* **Tabela Ligowa:** Posiada tylko jeden dokument. Wejdź w niego:
  * Zobaczysz przełącznik **"Obliczaj Automatycznie z Meczów"**. Jeśli jest WŁĄCZONY, punkty i bramki Nova City na stronie wyliczą się same na podstawie zakończonych spotkań!
  * W sekcji "Teams" dodaj drużyny z ligi. Wgraj im logo. Nowa drużyna startuje z 0 pkt. 
  * Jeśli WYŁĄCZYSZ auto-obliczanie, to punkty wpisane w tym miejscu w panelu będą w 100% użyte na stronie głównej i w podstronie meczów (tryb całkowicie ręczny).

---

## 👥 3. Pierwsza Drużyna i Akademia
Zarządzanie kadrą zespołu zostało logicznie podzielone.

*Gdzie szukać: Lewe menu -> `👥 Pierwsza Drużyna (Skład)`*
* Dodajesz tu profil piłkarza (pozycja, zdjęcie, numer na koszulce). 
* Zwróć uwagę na pole **Team Category**. Ustawione na `Pierwsza Drużyna` przypisze go do głównego składu.

*Gdzie szukać: Lewe menu -> `🎓 Akademia (Skład)`*
* Tworzysz graczy tak samo, lecz wybierasz dla nich kategorię (Team Category) `Akademia`.
* Pojawią się oni w odpowiedniej podstronie akademii na froncie witryny.
* *Wskazówka: W bazie masz opcję oznaczenia piłkarza jako "Legenda (Hall of Fame)". Taki gracz zniknie ze standardowego składu i trafi do Galerii Sław!*

---

## 👔 4. Zarząd (Board) i Sztab (Staff)
Podział ról zarządczych i trenerskich.
W obu miejscach tworzysz wpis "Staff", jednak różnią się one polem Departament (Dział):

*Gdzie szukać: Lewe menu -> `👔 Zarząd (Board)`*
* Kliknij "Create new". W polu *Department* wybierz `Zarząd`. 
* W polu roli (Role) dopasuj lub wpisz stanowisko, np. Prezes, Dyrektor Sportowy. Dodaj zdjęcie i opis kariery.

*Gdzie szukać: Lewe menu -> `🏋️ Sztab Szkoleniowy i Medyczny`*
* Tutaj twórz sylwetki trenera głównego, asystentów, lekarzy.
* Przypisz im odpowiedni departament (`Sztab Szkoleniowy` lub `Sztab Medyczny`).

---

## 📰 5. Pozostałe Treści
* **Aktualności (News):** Służy do pisania artykułów na bloga. Dodajesz miniaturkę graficzną, treść z bogatym formatowaniem i publikujesz.
* **Sponsorzy & Partnerzy:** Dodawaj logotypy sponsorów. Wszystkie loga pojawią się automatycznie w płynącej taśmie (karuzeli) w dolnej części strony.
* **Własne Podstrony (Custom Pages):** Genialne narzędzie do tworzenia podstron informacyjnych bez kodowania. Możesz stworzyć "O nas", "Regulamin" – wszystko składane z wbudowanych modułów tekstowych i graficznych.

*Życzymy owocnej pracy i samych sukcesów sportowych Twojego Klubu!*
