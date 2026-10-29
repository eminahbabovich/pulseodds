import { useMemo, useState } from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import MatchList from "./components/MatchList";
import OddsTable from "./components/OddsTable";
import { statusLabel, translations } from "./i18n.jsx";
import { useMatches } from "./hooks/useMatches";
import { useMatchDetail } from "./hooks/useMatchDetail";

export default function App() {
  const [language, setLanguage] = useState("bs");
  const [theme, setTheme] = useState("dark");
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { matches, loading, error } = useMatches();
  const activeId = selectedId || matches[0]?.id;
  const { detail, error: detailError } = useMatchDetail(activeId);
  const t = translations[language];

  const summary = useMemo(() => {
    const live = matches.filter((match) => match.status === "LIVE").length;
    const averageMove = matches.length
      ? (matches.reduce((total, match) => {
          const movement = [match.homeChange, match.drawChange, match.awayChange].reduce((sum, item) => sum + Number(item || 0), 0);
          return total + movement / 3;
        }, 0) / matches.length)
      : 0;

    const leagues = Object.entries(
      matches.reduce((acc, match) => {
        const key = match.homeTeam.league;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {})
    ).sort(([, a], [, b]) => b - a).slice(0, 3);

    return { live, averageMove, leagues };
  }, [matches]);

  const visible = useMemo(() => matches.filter((match) => {
    const matchesStatus = filter === "ALL" || match.status === filter;
    const value = `${match.homeTeam.name} ${match.awayTeam.name} ${match.homeTeam.league}`.toLowerCase();
    return matchesStatus && value.includes(search.toLowerCase());
  }), [matches, filter, search]);

  const syncTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return <main className="page" data-theme={theme}>
    <Header language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} t={t} />

    <section className="hero">
      <div className="demo-badge"><span />{language === "bs" ? "DEMO FEED · SIMULIRANI PODACI" : "DEMO FEED · SIMULATED DATA"}</div>
      <div className="kicker">{t.kicker}</div>
      <h1>{t.heroTitle}</h1>
      <p>{t.heroText}</p>
      <div className="hero-actions">
        <button type="button" className="primary" onClick={() => document.getElementById("fixture-board")?.scrollIntoView({ behavior: "smooth" })}>{language === "bs" ? "Otvorite tablu" : "Open board"}</button>
        <button type="button" className="secondary" onClick={() => window.print()}>{language === "bs" ? "Sačuvaj pregled" : "Save snapshot"}</button>
      </div>
      <div className="hero-meta">
        <span><strong>5s</strong>{t.refresh}</span>
        <span><strong>24/7</strong>{t.monitoring}</span>
        <span><strong>{summary.averageMove >= 0 ? "+" : ""}{summary.averageMove.toFixed(1)}%</strong>{t.edge}</span>
      </div>
    </section>

    <section className="overview">
      <Stat label={t.fixtures} value={matches.length} />
      <Stat label={t.liveSignals} value={summary.live} accent="green" />
      <Stat label={t.marketMove} value={`${summary.averageMove >= 0 ? "+" : ""}${summary.averageMove.toFixed(1)}%`} accent="olive" />
      <Stat label={t.lastSync} value={syncTime} small />
    </section>

    <section className="dashboard-row">
      <div className="mini-panel">
        <div className="mini-head">
          <div>
            <small>{language === "bs" ? "Tržišni puls" : "Market pulse"}</small>
            <h3>{language === "bs" ? "Najaktivnije lige" : "Top leagues"}</h3>
          </div>
          <span>{language === "bs" ? "Uživo" : "Live"}</span>
        </div>
        <div className="league-list">
          {summary.leagues.length ? summary.leagues.map(([league, count]) => (
            <div key={league} className="league-item">
              <div>
                <strong>{league}</strong>
                <small>{count} {language === "bs" ? "utakmica" : "fixtures"}</small>
              </div>
              <span className="trend up">▲</span>
            </div>
          )) : <div className="empty-panel">{t.noData}</div>}
        </div>
      </div>

      <div className="mini-panel">
        <div className="mini-head">
          <div>
            <small>{language === "bs" ? "Watchlist" : "Watchlist"}</small>
            <h3>{language === "bs" ? "Nova kretanja" : "Fresh movers"}</h3>
          </div>
          <span>{language === "bs" ? "Danas" : "Today"}</span>
        </div>
        <div className="watchlist">
          {matches.slice(0, 3).map((match) => (
            <div key={match.id} className="watch-item">
              <div className="watch-copy">
                <strong>{match.homeTeam.shortName} vs {match.awayTeam.shortName}</strong>
                <small>{match.homeTeam.league}</small>
              </div>
              <span className={`signal ${match.status.toLowerCase()}`}>{match.status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {error && <div className="error">{error}</div>}

    <section className="content">
      <section className="surface" id="fixture-board">
        <div className="surface-head">
          <div>
            <h2>{t.fixtureBoard}</h2>
            <span className="caption">{t.fixtureCaption}</span>
          </div>
          <span className="count">{visible.length} / {matches.length}</span>
        </div>
        <FilterBar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} t={t} />
        <MatchList matches={visible} selectedId={activeId} onSelect={setSelectedId} language={language} t={t} />
        {loading && <div className="empty">Loading...</div>}
      </section>

      <section className="surface insight">
        <div className="surface-head">
          <div>
            <h2>{t.marketTitle}</h2>
            <span className="caption">{t.marketCaption}</span>
          </div>
          <span className="count">{syncTime}</span>
        </div>
        {detailError ? <div className="error">{detailError}</div> : <OddsTable detail={detail} t={t} status={detail ? statusLabel(language, detail.match.status) : ""} />}
      </section>
    </section>

    <footer>{t.footer} · <code>GET /api/matches</code><span className="personal-mark">personal build</span></footer>
  </main>;
}

function Stat({ label, value, accent, small }) {
  return <div className="stat"><label>{label}</label><strong className={accent || ""} style={small ? { fontSize: 18 } : undefined}>{value}</strong></div>;
}
