import { statusLabel } from "../i18n";

function Form({ value }) {
  return <div className="form">{(value || "").split("").map((item, index) =>
    <i key={`${item}-${index}`} className={item === "L" ? "loss" : item === "D" ? "draw" : ""}>{item}</i>)}</div>;
}

export default function MatchCard({ match, language, selected, onSelect, t }) {
  return <article className={`fixture ${selected ? "selected-fixture" : ""}`} onClick={() => onSelect(match.id)}>
    <div className="fixture-top"><span className="league">{match.homeTeam.league}</span><span className={`status ${match.status.toLowerCase()}`}>{statusLabel(language, match.status)}</span></div>
    <div className="fixture-teams"><div className="team"><span className="crest">{match.homeTeam.shortName}</span>{match.homeTeam.name}</div><span className="vs">VS</span><div className="team away">{match.awayTeam.name}<span className="crest">{match.awayTeam.shortName}</span></div></div>
    <div className="fixture-foot"><div className="form" title={t.form}><Form value={match.homeForm} /><span>·</span><Form value={match.awayForm} /></div><span className="venue">{match.venue} · {new Date(match.kickoffAt).toLocaleDateString()}</span></div>
  </article>;
}
