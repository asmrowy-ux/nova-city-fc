import { Card, Text, Heading, Stack, Box, Code } from '@sanity/ui'

export function Manual() {
  return (
    <Box padding={4} style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Card padding={5} radius={3} shadow={1}>
        <Stack space={5}>
          <Heading as="h1" size={5}>📖 Kompletna Instrukcja Obsługi CMS</Heading>
          
          <Text size={2} style={{ lineHeight: '1.6' }}>
            Witaj w panelu zarządzania! Poniżej znajduje się szczegółowy opis <strong>każdej zakładki</strong> dostępnej w lewym menu nawigacyjnym. Dowiesz się stąd, do czego służą poszczególne sekcje i jak z nich korzystać.
          </Text>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>1. 📄 Własne Podstrony (Custom Pages)</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              Pozwala tworzyć zupełnie nowe podstrony w serwisie (np. "O projekcie", "Zasady naboru") korzystając z wbudowanych bloków treści i obrazów bez wiedzy programistycznej.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>2. ⚙️ Ustawienia Główne (Site Settings)</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              Centralne miejsce zarządzania wyglądem:
            </Text>
            <ul style={{ lineHeight: '1.6', fontSize: '1rem', margin: '8px 0 0 20px', color: 'var(--card-fg-color)' }}>
              <li><strong>Podstawowe:</strong> Zmień Nazwę Klubu, wgraj Logo główne oraz zbuduj rozwijane menu (Nawigację).</li>
              <li><strong>Kolory & Motyw:</strong> Zmień główny kolor akcentu (HEX), tła poszczególnych sekcji oraz kolor dekoracyjnych poświat i ukośnych pasków.</li>
              <li><strong>Sekcja Główna (Hero):</strong> Ustaw powitalne zdjęcie u góry strony i duży napis (np. "WITAJ W NOVA CITY").</li>
              <li><strong>Przyciski:</strong> Zdefiniuj indywidualny kolor dla przycisku w menu, przycisku w aktualnościach i przycisku w stopce.</li>
              <li><strong>Tytuły Sekcji:</strong> Zmień domyślne nazwy (np. z "Aktualności" na "Wiadomości") i przypisz każdemu nagłówkowi odrębny kolor.</li>
            </ul>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>3. 📞 Kontakt i Siedziba oraz 🏟️ Stadion</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              <strong>Kontakt i Siedziba:</strong> Wpisz adres klubu, numer telefonu, e-mail oraz linki do mediów społecznościowych. Te dane pojawią się w stopce i na podstronie kontaktowej.<br/>
              <strong>Stadion:</strong> Opisz swoją arenę, dodaj jej zdjęcie, podaj pojemność oraz rok budowy, by kibice mogli poznać dom Twojego klubu.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>4. 📰 Aktualności (News)</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              Panel blogowy klubu. Dodawaj artykuły, raporty pomeczowe i oświadczenia. Posiadają one opcję wgrania głównego zdjęcia (miniaturki) oraz budowania treści tekstowej.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>5. ⚽ Klub (Tabela, Terminarz, Rozgrywki)</Heading>
            <Text size={2} style={{ lineHeight: '1.6', marginBottom: '16px' }}>
              To serce Twojej strony sportowej. Tutaj zarządzasz terminarzem meczów i tabelą ligową.
            </Text>
            
            <Heading as="h3" size={2} style={{ margin: '16px 0 8px 0', color: 'var(--card-fg-color)' }}>Jak dodać Tebelę Ligową i Kluby?</Heading>
            <ol style={{ lineHeight: '1.6', fontSize: '1rem', margin: '0 0 16px 20px', color: 'var(--card-fg-color)' }}>
              <li>Przejdź do zakładki <strong>Klub {'>'} Tabela Ligowa</strong> i kliknij <em>Add (Dodaj)</em>.</li>
              <li>Wpisz nazwę sezonu (np. "Sezon 2026/27") i nazwę rozgrywek.</li>
              <li>Włącz przełącznik <strong>Auto-obliczanie tabeli (Auto Calculate)</strong> – dzięki temu system sam zsumuje punkty z zakończonych meczów, które dodasz w zakładce <em>Mecze & Wyniki</em>!</li>
              <li>W sekcji <em>Drużyny (Teams)</em> kliknij <strong>Add item</strong> dla każdego klubu w lidze. Wpisz nazwę zespołu i dodaj jego herb (Logo).</li>
              <li>Zapisz (Publish). Od teraz Tabela Ligowa jest widoczna na Stronie Głównej i w zakładkach!</li>
            </ol>

            <Heading as="h3" size={2} style={{ margin: '16px 0 8px 0', color: 'var(--card-fg-color)' }}>Jak dodać Mecze i zaktualizować Terminarz?</Heading>
            <ol style={{ lineHeight: '1.6', fontSize: '1rem', margin: '0 0 16px 20px', color: 'var(--card-fg-color)' }}>
              <li>Przejdź do zakładki <strong>Klub {'>'} Mecze & Wyniki</strong> i kliknij <em>Add (Dodaj)</em>.</li>
              <li>Wpisz nazwę przeciwnika (np. "FC Barcelona") i wybierz datę rozegrania meczu.</li>
              <li>Zaznacz opcję <strong>Gospodarz (Is Home Match?)</strong>, jeśli grasz na własnym stadionie. W przeciwnym razie system uzna, że to wyjazd.</li>
              <li>Zmień Status na <strong>Nadchodzący (Upcoming)</strong> – po opublikowaniu, ten mecz automatycznie wskoczy do <em>Terminarza (Fixtures)</em> na Stronie Głównej!</li>
            </ol>

            <Heading as="h3" size={2} style={{ margin: '16px 0 8px 0', color: 'var(--card-fg-color)' }}>Jak wpisać Wynik po zakończonym meczu?</Heading>
            <ol style={{ lineHeight: '1.6', fontSize: '1rem', margin: '0 0 16px 20px', color: 'var(--card-fg-color)' }}>
              <li>Wejdź w swój rozegrany mecz (w zakładce <em>Mecze & Wyniki</em>).</li>
              <li>Zmień Status z <em>Upcoming</em> na <strong>Zakończony (Finished)</strong>.</li>
              <li>Pojawią się dwa nowe pola: <strong>Bramki Gospodarzy (Home Score)</strong> oraz <strong>Bramki Gości (Away Score)</strong>. Wpisz tam odpowiednie liczby.</li>
              <li>Kliknij <em>Publish</em>. <strong>Co się teraz stanie?</strong> 
                <ul style={{marginTop: '4px'}}>
                  <li>Mecz zniknie z Terminarza "Nadchodzących", a przeniesie się do sekcji Ostatnich Wyników.</li>
                  <li>Jeśli masz włączone <em>Auto-obliczanie tabeli</em>, system <strong>natychmiast przyzna punkty</strong> Twojej drużynie oraz drużynie Przeciwnika w Tabeli Ligowej (3 pkt za wygraną, 1 za remis)!</li>
                </ul>
              </li>
            </ol>
            
            <Heading as="h3" size={2} style={{ margin: '16px 0 8px 0', color: 'var(--card-fg-color)' }}>Gdzie i jak zarządzać Zdjęciami?</Heading>
            <ul style={{ lineHeight: '1.6', fontSize: '1rem', margin: '0 0 0 20px', color: 'var(--card-fg-color)' }}>
              <li><strong>Logo Klubów:</strong> Dodajesz bezpośrednio w <em>Tabeli Ligowej</em>. Obrazki automatycznie zostaną pomniejszone do formatu herbu.</li>
              <li><strong>Miniaturki Aktualności:</strong> W zakładce <em>Aktualności (News)</em> każde pole "Main Image" odpowiada za duży obrazek kafelka na stronie. Zawsze używaj poziomych zdjęć.</li>
              <li><strong>Zdjęcia Zawodników:</strong> W zakładce Zawodnicy (Player). System sam wytnie z nich tło na kartę, jeśli wgrasz zdjęcie profilowe (Portrait).</li>
            </ul>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>6. 🏛️ Club History i ⭐ Hall of Fame</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              <strong>Club History:</strong> Opisz historię powstania zespołu krok po kroku.<br/>
              <strong>Hall of Fame (Galeria Sław):</strong> Tutaj automatycznie lądują wszyscy Zawodnicy, u których zaznaczysz pole <em>"Is Legend? (Hall of Fame)"</em>.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>7. Zarządzanie Ludźmi (Drużyny i Sztab)</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              Personel podzielony jest na cztery bardzo czytelne zakładki:
            </Text>
            <ul style={{ lineHeight: '1.6', fontSize: '1rem', margin: '8px 0 0 20px', color: 'var(--card-fg-color)' }}>
              <li><strong>👥 Pierwsza Drużyna (Skład):</strong> Piłkarze z ustawioną kategorią <em>"Pierwsza Drużyna"</em>. Zobaczysz ich głównym widoku drużyny.</li>
              <li><strong>🎓 Akademia (Skład):</strong> Piłkarze z ustawioną kategorią <em>"Akademia"</em>. Dedykowane miejsce dla młodzieży.</li>
              <li><strong>🏋️ Sztab Szkoleniowy i Medyczny:</strong> Pracownicy (Staff), u których wybrano departament <em>"Sztab Szkoleniowy"</em> lub <em>"Medyczny"</em> (Trenerzy, Fizjoterapeuci).</li>
              <li><strong>👔 Zarząd (Board):</strong> Pracownicy (Staff), u których wybrano departament <em>"Zarząd"</em> (Dyrektorzy, Prezes).</li>
            </ul>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>8. 🤝 Sponsors & Partners</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              Dodawaj firmy współpracujące z klubem. Wgraj ich logotyp i (opcjonalnie) link do strony. Będą oni automatycznie wyświetlać się w płynącej karuzeli na dole strony, nad stopką.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>9. ⚖️ Strony Prawne</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              Szybki sposób na wygenerowanie np. "Polityki Prywatności" lub "Regulaminu Sklepu". Są to proste, tekstowe strony bez zbędnych grafik.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>10. 🛒 Sklep i 🎟️ Bilety</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              <strong>Sklep (Produkty):</strong> Dodawaj klubowe koszulki, kubki i szaliki. Ustalaj ceny i opis przedmiotów.<br/>
              <strong>Bilety:</strong> Miejsce na wprowadzanie biletów meczowych, karnetów sezonowych i pakietów VIP.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size={3} style={{ marginBottom: '16px' }}>💡 Tagi Dynamiczne (Tip)</Heading>
            <Text size={2} style={{ lineHeight: '1.6' }}>
              We wszystkich długich tekstach (biografie, aktualności) możesz użyć tagu <Code size={2}>[KLUB]</Code>. 
              Zostanie on automatycznie podmieniony na Twoją Nazwę Klubu z Ustawień Głównych.
            </Text>
          </Box>

        </Stack>
      </Card>
    </Box>
  )
}
