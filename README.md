# Ruokataisto

Solidabiksen ruokateemaisen haasteen inspiroimana toteutettu pieni peli.

## Käynnistys

Kloonaa repo.
Avaa kaksi terminaalia.

## BE

Ensimmäisessä terminaalissa navigoi ruokataisto-backendiin. Asenna riippuvuudet `npm install`. Käynnistä palvelin `npm start`.

## FE

Toisessa terminaalissa navigoi ruokataisto-frontendiin. Asenna riippuvuudet `npm install`. Käynnistä palvelin `npm start`.

## Teknologiat:

- TypeScript
- FE: React
- BE: NestJS

Devattu ja testattu Win10 + Node 16.17 + Firefox + Chrome.

## Kuvaus

Sovelluksen auetessa haetaan ensin palvelimelta kuratoitu lista kasviksia, jotta taistelut olisivat jotenkin järkeviä.
Listan kasvikset haetaan Finelin APIsta, kakutetaan vuodeksi ja muutetaan hahmoiksi.

Käyttäjä valitsee kaksi haluamaansa kasvista ja painaa "Aloita taistelu".
Frontti avaa WebSocket-yhteyden bäkkärille, bäkkäri alkaa pyörittämään pelilooppia ja ilmoittaa WebSocket-eventeillä
frontille kun lyöntejä tapahtuu. Pelin päättyessä ilmoitetaan voittaja ja lokeja pääsee tutkimaan kunnes painaa "Pelaa uudelleen".

Taistelu on visualisoitu huikeilla grafiikoilla ja valinnaisesti lokinäkymällä. Huomatkaa erityisesti mahtava parallax-toteutus,
CSS-animaatiot ja viimeistelty layout.

Ainoa rönsyily spekseihin verrattuna on se, että lyönneillä on 10 % mahdollisuus olla kriittisiä, jolloin hyökkääjän hyökkäys lasketaan tuplana ennen kuin siitä vähennetään puolustus.

Testejähän ei sitten ole (not proud tho, mutta nää on näitä) :)
