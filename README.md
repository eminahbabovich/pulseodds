# PulseOdds

PulseOdds je full-stack sports analytics dashboard za pregled utakmica, forme ekipa i promjena kvota kroz čist, responsive interfejs.

Projekat povezuje React/Vite frontend sa Spring Boot REST API-jem. Backend koristi JPA, Flyway migracije i H2 bazu za lokalni razvoj, dok frontend nudi filtere, pretragu, detalje utakmice, market indikatore, lokalizaciju i Light/Dark mode.

> **Demo feed:** aplikacija trenutno koristi seedovane utakmice i simulirane promjene kvota. Feed je označen u interfejsu kao `DEMO FEED · SIMULIRANI PODACI`. Kvote se osvježavaju svakih pet sekundi radi demonstracije near real-time frontend/backend toka.

## Preview

Dashboard je dizajniran sa fokusom na:

- jasnu vizuelnu hijerarhiju i čitljiv layout
- pregledan responsive prikaz za desktop, tablet i telefon
- bosanski i engleski jezik
- Light/Dark mode
- pregled statusa utakmica i forme ekipa
- detaljan pregled 1X2 kvota i njihovih promjena

## Tehnologije

**Frontend**

- React 18
- Vite
- JavaScript / JSX
- CSS custom properties i responsive CSS
- Plus Jakarta Sans i Inter

**Backend**

- Java 21
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security
- Flyway
- H2 za lokalni razvoj
- PostgreSQL podrška za produkciju
- Swagger / OpenAPI

## Funkcionalnosti

- pregled utakmica po statusu: sve, uživo, najava i završeno
- pretraga po nazivu ekipe ili lige
- prikaz forme posljednjih pet utakmica
- odabir utakmice i pregled market indikatora
- promjena kvota sa procentom i smjerom promjene
- automatsko osvježavanje svakih pet sekundi
- simulacija promjene kvota kroz Spring scheduler
- Light/Dark mode
- Bosanski/English language switcher
- responsive dashboard layout
- validacija API parametara i standardizovani error odgovori
- Swagger dokumentacija
- Flyway migracije
- GitHub Actions workflow za GitHub Pages frontend deploy

## Arhitektura

```text
React + Vite frontend
        │
        │ /api proxy u developmentu
        ▼
Spring Boot REST API
        │
        ▼
Spring Data JPA
        │
        ▼
H2 lokalno / PostgreSQL produkcijski
```

```text
frontend/src/
├── components/
│   ├── FilterBar.jsx
│   ├── Header.jsx
│   ├── MatchCard.jsx
│   ├── MatchList.jsx
│   └── OddsTable.jsx
├── hooks/
│   ├── useMatchDetail.js
│   └── useMatches.js
├── api.js
├── App.jsx
├── i18n.jsx
└── styles.css
```

Backend prati standardnu Spring Boot strukturu sa odvojenim controller, service, repository, DTO, model, config i exception slojevima.

## Pokretanje projekta

### Preduvjeti

- Java JDK 21 ili noviji
- Node.js 18 ili noviji
- npm

```bat
java -version
node --version
npm --version
```

### Windows helper

`run-project.bat` pokreće backend i frontend u odvojenim prozorima.

### Ručno pokretanje

Backend:

```bat
cd /d C:\Users\HP\Downloads\projektic\demo
mvnw.cmd spring-boot:run
```

Frontend, u drugom terminalu:

```bat
cd /d C:\Users\HP\Downloads\projektic\frontend
npm install
npm run dev
```

Lokalne adrese:

- frontend: <http://localhost:5173>
- backend: <http://localhost:8080>
- API: <http://localhost:8080/api/matches>
- Swagger: <http://localhost:8080/swagger-ui.html>

U development modu Vite prosljeđuje `/api` zahtjeve na Spring Boot backend.

## Production build

```bat
cd /d C:\Users\HP\Downloads\projektic\frontend
npm install
npm run build
npm run preview
```

Build output se generiše u `frontend/dist/`.

## API

| Method | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/matches` | Lista utakmica sa trenutnim kvotama |
| `GET` | `/api/matches/{id}` | Detalji utakmice i odds history |
| `GET` | `/v3/api-docs` | OpenAPI JSON dokumentacija |
| `GET` | `/swagger-ui.html` | Swagger UI |

## Demo podaci i ograničenja

Lokalna verzija backend-a:

- seeduje četiri demo utakmice pri pokretanju
- koristi H2 in-memory bazu
- simulira promjene kvota svakih pet sekundi
- resetuje podatke nakon restarta aplikacije

Ovo nije pravi sports data provider niti aplikacija za klađenje. Projekat je fokusiran na demonstraciju REST API integracije, modelovanja podataka, periodičnog backend procesa, responsive React interfejsa i prikaza promjenjivih podataka.

## Deployment

Frontend workflow se nalazi u `.github/workflows/deploy-frontend.yml` i automatski:

1. instalira dependencies
2. pravi production build
3. uploaduje `frontend/dist`
4. deploya frontend na GitHub Pages

GitHub Pages hostuje samo statički frontend. Backend se može deployati odvojeno na Render, Railway, Fly.io ili sličan servis.

Production API adresa se postavlja kroz:

```text
VITE_API_BASE_URL=https://tvoj-backend-url/api
```

Lokalna konfiguracija koristi `frontend/.env.example` kao template:

```bat
copy frontend\.env.example frontend\.env
```

Za GitHub Actions vrijednost se može dodati kao repository variable pod:

```text
Settings → Secrets and variables → Actions → Variables
```

## GitHub

Projekat koristi root `.gitignore` koji iz repozitorija isključuje:

- `node_modules/`
- `frontend/dist/`
- `demo/target/`
- `.env` fajlove
- IDE i OS konfiguracione fajlove

Prvi commit i push:

```bat
cd /d C:\Users\HP\Downloads\projektic
git init
git add .
git commit -m "Initial PulseOdds portfolio project"
git branch -M main
git remote add origin https://github.com/USERNAME/pulseodds.git
git push -u origin main
```

Naredne izmjene:

```bat
git add .
git commit -m "Polish dashboard and documentation"
git push
```

Nakon prvog push-a, GitHub Pages se aktivira kroz **Settings → Pages → GitHub Actions**.

## Moguća naredna poboljšanja

- integracija stvarnog sports data providera
- PostgreSQL baza u produkciji
- autentifikacija korisnika
- watchlist i personalizovane notifikacije
- graf historije kvota
- testovi za API i React komponente
- javni deploy backend-a i live demo URL

## Autor

PulseOdds je samostalni portfolio projekat koji spaja frontend product design, React razvoj i Spring Boot backend inženjering u jednu cjelinu.
