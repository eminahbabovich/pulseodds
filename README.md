# PulseOdds

PulseOdds je moj full-stack projekat: dashboard za pregled sportskih utakmica, forme ekipa i promjena kvota. Frontend je u Reactu (Vite), a backend u Spring Bootu.

Napravio sam ga da vježbam povezivanje cijelog lanca, od baze preko REST API-ja do interfejsa koji se sam osvježava.

> **Važno:** podaci su demo. Utakmice su seedovane pri pokretanju, a kvote se mijenjaju simulacijom. Zato u aplikaciji stoji oznaka `DEMO FEED · SIMULIRANI PODACI`. Ovo nije pravi sports data provider niti aplikacija za klađenje.

## Šta aplikacija radi

- prikazuje utakmice i može ih filtrirati po statusu (sve, uživo, najava, završeno)
- pretraga po nazivu ekipe ili lige
- forma ekipa kroz posljednjih pet utakmica
- klik na utakmicu otvara detalje: 1X2 kvote, njihova promjena u procentima i smjer promjene
- kvote se osvježavaju svakih pet sekundi
- bosanski i engleski jezik
- Light/Dark mode
- raspored se prilagođava desktopu, tabletu i telefonu

## Tehnologije

**Frontend:** React 18, Vite, JavaScript (JSX), CSS custom properties, fontovi Plus Jakarta Sans i Inter.

**Backend:** Java 21, Spring Boot 3, Spring Web, Spring Data JPA, Spring Security, Flyway, H2 za lokalni razvoj, podrška za PostgreSQL u produkciji, Swagger/OpenAPI.

## Kako je složeno

```text
React + Vite frontend
        │  (u developmentu Vite proxy šalje /api na backend)
        ▼
Spring Boot REST API
        ▼
Spring Data JPA
        ▼
H2 lokalno / PostgreSQL u produkciji
```

Backend je podijeljen na controller, service, repository, DTO, model, config i exception slojeve. Promjenu kvota simulira Spring scheduler koji radi u pozadini.

Frontend:

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

## Pokretanje

Treba ti Java JDK 21+, Node.js 18+ i npm.

Backend:

```bat
cd demo
mvnw.cmd spring-boot:run
```

Frontend (u drugom terminalu):

```bat
cd frontend
npm install
npm run dev
```

Ako koristiš Windows, `run-project.bat` pokrene oba u odvojenim prozorima.

Adrese:

- frontend: http://localhost:5173
- backend: http://localhost:8080
- API: http://localhost:8080/api/matches
- Swagger: http://localhost:8080/swagger-ui.html

Production build frontenda:

```bat
cd frontend
npm run build
npm run preview
```

## API

| Method | Endpoint | Opis |
|---|---|---|
| `GET` | `/api/matches` | lista utakmica s trenutnim kvotama |
| `GET` | `/api/matches/{id}` | detalji utakmice i historija kvota |
| `GET` | `/v3/api-docs` | OpenAPI JSON |
| `GET` | `/swagger-ui.html` | Swagger UI |

API parametri se validiraju, a greške se vraćaju u istom, standardizovanom formatu.

## Ograničenja demo verzije

- pri pokretanju se seeduju četiri utakmice
- H2 je in-memory, pa se svi podaci resetuju kad restartujem aplikaciju
- kvote su simulirane, ne dolaze ni od kakvog stvarnog izvora

## Deployment

Frontend se deploya na GitHub Pages preko workflow-a u `.github/workflows/deploy-frontend.yml`. On instalira dependencies, napravi build i objavi `frontend/dist`.

GitHub Pages hostuje samo statički sadržaj, pa backend ide posebno (Render, Railway, Fly.io ili slično). Adresa backenda se postavlja varijablom:

```text
VITE_API_BASE_URL=https://tvoj-backend-url/api
```

Lokalno kopiraj `frontend/.env.example` u `frontend/.env`. Na GitHubu se varijabla dodaje u Settings → Secrets and variables → Actions → Variables.

## Šta želim dodati

- pravi sports data provider umjesto simulacije
- PostgreSQL u produkciji
- prijava korisnika
- watchlist i notifikacije
- graf historije kvota
- testove za API i React komponente
- javno objavljen backend i live demo

## Autor

Emin Ahbabović
