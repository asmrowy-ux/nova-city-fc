const pptxgen = require('pptxgenjs');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureScreenshots() {
  console.log('Uruchamianie przeglądarki...');
  const browser = await puppeteer.launch({ 
    headless: "new",
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();
  
  console.log('Robienie zrzutu strony głównej...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000)); // Czekamy na animacje
  await page.screenshot({ path: 'home_screenshot.png' });

  console.log('Robienie zrzutu meczów...');
  await page.goto('http://localhost:3000/matches', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'matches_screenshot.png' });

  console.log('Robienie zrzutu sztabu...');
  await page.goto('http://localhost:3000/staff', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'staff_screenshot.png' });

  await browser.close();
  console.log('Zrzuty ekranu gotowe.');
}

async function createPresentation() {
  console.log('Generowanie prezentacji PowerPoint...');
  let pres = new pptxgen();
  
  pres.layout = 'LAYOUT_16x9';

  pres.defineSlideMaster({
    title: 'MASTER_SLIDE',
    background: { color: '0A0A0A' }, // Ciemny motyw
    objects: [
      { rect: { x: 0, y: 0, w: '100%', h: 0.5, fill: { color: '7FFFD4' } } } // Złoty akcent na górze
    ]
  });

  // Slajd 1: Tytułowy
  let slide1 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
  slide1.addText('Wicher Gdynia / Nova City FC', { x: 0, y: 2, w: '100%', h: 1, fontSize: 48, bold: true, color: 'FFFFFF', align: 'center' });
  slide1.addText('Nowa era cyfrowa dla Twojego Klubu', { x: 0, y: 3.5, w: '100%', h: 1, fontSize: 28, color: '7FFFD4', align: 'center' });
  slide1.addText('Szybka, nowoczesna i skalowalna platforma internetowa (Next.js + Sanity)', { x: 0, y: 4.5, w: '100%', h: 1, fontSize: 18, color: 'AAAAAA', align: 'center' });

  // Slajd 2: Co zbudowaliśmy?
  let slide2 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
  slide2.addText('Co zbudowaliśmy?', { x: 0.5, y: 0.5, w: '100%', h: 1, fontSize: 36, bold: true, color: 'FFFFFF' });
  slide2.addText('To nie jest kolejna zwykła strona z szablonu. Zbudowaliśmy aplikację internetową typu Custom-built, stworzoną od zera w najnowszych technologiach (Next.js 15).', { x: 0.5, y: 1.5, w: 4.5, h: 2, fontSize: 18, color: 'CCCCCC' });
  slide2.addText('✅ Kosmiczna wydajność\n✅ Design Premium (Dark/Light mode)\n✅ Globalny zasięg (Wielojęzyczność i18n)\n✅ Modułowość (Mecze, Sztab, Tabele)', { x: 0.5, y: 3.5, w: 4.5, h: 2, fontSize: 16, color: '7FFFD4', bullet: true });
  
  if (fs.existsSync('home_screenshot.png')) {
    slide2.addImage({ path: 'home_screenshot.png', x: 5.5, y: 1.5, w: 4, h: 3.5, sizing: { type: 'contain' } });
  }

  // Slajd 3: Zarządzanie Treścią (Sanity CMS)
  let slide3 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
  slide3.addText('Zarządzanie Treścią (Sanity CMS)', { x: 0.5, y: 0.5, w: '100%', h: 1, fontSize: 36, bold: true, color: 'FFFFFF' });
  slide3.addText('Pełna kontrola w Twoich rękach – bez proszenia programisty.', { x: 0.5, y: 1.5, w: '100%', h: 0.5, fontSize: 20, color: '7FFFD4' });
  slide3.addText('Pożegnaj wolnego, zacinającego się WordPressa. Zintegrowaliśmy system Sanity CMS – narzędzie klasy Enterprise (Headless CMS).\n\n• Prostota obsługi: Dodawaj mecze, zawodników i wiadomości w kilka kliknięć.\n• Moduł boiska: Ręczne ustawianie składu wyjściowej XI na grafice.\n• Globalny Fallback: System awaryjnie pobierze polskie teksty, jeśli brakuje angielskich.', { x: 0.5, y: 2.2, w: 5, h: 4, fontSize: 16, color: 'CCCCCC' });
  
  if (fs.existsSync('staff_screenshot.png')) {
    slide3.addImage({ path: 'staff_screenshot.png', x: 6, y: 1.5, w: 3.5, h: 3.5, sizing: { type: 'contain' } });
  }

  // Slajd 4: SEO i Niezawodność
  let slide4 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
  slide4.addText('SEO i Niezawodność', { x: 0.5, y: 0.5, w: '100%', h: 1, fontSize: 36, bold: true, color: 'FFFFFF' });
  slide4.addText('Bądź pierwszy w Google.', { x: 0.5, y: 1.5, w: '100%', h: 0.5, fontSize: 20, color: '7FFFD4' });
  slide4.addText('• Server-Side Rendering (SSR): Błyskawiczna indeksacja wyników i aktualności w wyszukiwarkach.\n• Bezpieczeństwo: Brak bazy danych na froncie i wtyczek sprawia, że strona jest wysoce odporna na ataki hakerskie.\n• Mobile First: Działa perfekcyjnie na komórkach (80% ruchu kibiców).', { x: 0.5, y: 2.2, w: 5, h: 4, fontSize: 16, color: 'CCCCCC' });
  
  if (fs.existsSync('matches_screenshot.png')) {
    slide4.addImage({ path: 'matches_screenshot.png', x: 6, y: 1.5, w: 3.5, h: 3.5, sizing: { type: 'contain' } });
  }

  // Slajd 5: Co dalej? (Możliwości Rozwoju)
  let slide5 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
  slide5.addText('Co dalej? (Możliwości Rozwoju)', { x: 0.5, y: 0.5, w: '100%', h: 1, fontSize: 36, bold: true, color: 'FFFFFF' });
  slide5.addText('To dopiero początek. Platforma, która rośnie z Wami.', { x: 0.5, y: 1.5, w: '100%', h: 0.5, fontSize: 20, color: '7FFFD4' });
  slide5.addText('• E-Commerce (Sklep): Integracja do sprzedaży koszulek i gadżetów.\n• Bilety (Ticketing): Własny moduł sprzedaży biletów.\n• Aplikacja PWA: Możliwość zainstalowania strony na telefonie.\n• Akademia: Dedykowane panele dla graczy i rodziców.', { x: 0.5, y: 2.2, w: 9, h: 3, fontSize: 18, color: 'CCCCCC', bullet: true });

  // Slajd 6: Podsumowanie
  let slide6 = pres.addSlide({ masterName: 'MASTER_SLIDE' });
  slide6.addText('Dlaczego to inwestycja, która się zwraca?', { x: 0.5, y: 0.5, w: '100%', h: 1, fontSize: 36, bold: true, color: 'FFFFFF' });
  slide6.addText('Premium Design = Premium Sponsorzy', { x: 0.5, y: 1.5, w: '100%', h: 0.5, fontSize: 24, color: '7FFFD4', bold: true });
  slide6.addText('Klub piłkarski to marka. Kiedy sponsor wchodzi na stronę i widzi przestarzały, wolny system, wycenia wartość klubu niżej.\n\nKiedy widzi błyskawiczną, animowaną, wielojęzyczną platformę o standardach Ligi Mistrzów – klub od razu zyskuje pozycję w negocjacjach sponsorskich.', { x: 0.5, y: 2.5, w: 9, h: 3, fontSize: 20, color: 'CCCCCC' });

  // Save Presentation
  const outputFileName = 'Prezentacja_Klubowa.pptx';
  await pres.writeFile({ fileName: outputFileName });
  console.log(`Sukces! Zapisano prezentację jako: ${outputFileName}`);
}

async function run() {
  try {
    await captureScreenshots();
    await createPresentation();
  } catch (err) {
    console.error('Błąd podczas tworzenia prezentacji:', err);
  }
}

run();
