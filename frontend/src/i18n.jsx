export const translations = {
  bs: {
    liveEngine: "LIVE ENGINE", kicker: "Sports intelligence, bez buke",
    heroTitle: <>Pronađi pomak<br /><em>prije tržišta.</em></>,
    heroText: "Čista slika utakmica, forme i kretanja kvota. Bez nagađanja — samo podaci koji pomažu da razumiješ šta se mijenja.",
    refresh: "osvježavanje", monitoring: "nadzor tržišta", edge: "prosječna prednost",
    fixtures: "UTAKMICE", liveSignals: "SIGNALI UŽIVO", marketMove: "TRŽIŠNI POMAK", lastSync: "ZADNJA SINHRONIZACIJA",
    fixtureBoard: "Pregled utakmica", fixtureCaption: "Forma, kontekst i tržište na jednom mjestu",
    all: "Sve", live: "Uživo", upcoming: "Najava", finished: "Završeno", search: "Pretraži tim ili ligu",
    marketTitle: "Tržišni indikatori", marketCaption: "Promjena od prethodnog mjerenja · real-time",
    home: "Domaćin", draw: "Neriješeno", away: "Gost", venue: "Stadion", competition: "Takmičenje",
    form: "Forma zadnjih 5", selected: "Odabrana utakmica", noData: "Nema utakmica za odabrane kriterije",
    noSelection: "Odaberi utakmicu za pregled indikatora", change: "promjena", footer: "Podaci se osvježavaju automatski svakih 5 sekundi."
  },
  en: {
    liveEngine: "LIVE ENGINE", kicker: "Sports intelligence, without the noise",
    heroTitle: <>Find the move<br /><em>before the market.</em></>,
    heroText: "A clear view of fixtures, form and odds movement. No guesswork — just the signals that explain what is changing.",
    refresh: "refresh cycle", monitoring: "market watch", edge: "average edge",
    fixtures: "FIXTURES", liveSignals: "LIVE SIGNALS", marketMove: "MARKET MOVE", lastSync: "LAST SYNC",
    fixtureBoard: "Fixture board", fixtureCaption: "Form, context and market in one place",
    all: "All", live: "Live", upcoming: "Upcoming", finished: "Finished", search: "Search team or league",
    marketTitle: "Market indicators", marketCaption: "Change from previous reading · real-time",
    home: "Home", draw: "Draw", away: "Away", venue: "Venue", competition: "Competition",
    form: "Last 5 form", selected: "Selected fixture", noData: "No fixtures match your filters",
    noSelection: "Select a fixture to inspect indicators", change: "change", footer: "Data refreshes automatically every five seconds."
  }
};

export const statusLabel = (language, status) =>
  ({ LIVE: language === "bs" ? "Uživo" : "Live", UPCOMING: language === "bs" ? "Najava" : "Upcoming", FINISHED: language === "bs" ? "Završeno" : "Finished" })[status];
