function Movement({ value }) {
  const amount = Number(value || 0);
  const direction = amount > 0 ? "up" : amount < 0 ? "down" : "flat";
  return <span className={`movement ${direction}`}>{amount > 0 ? "↑" : amount < 0 ? "↓" : "→"} {Math.abs(amount).toFixed(2)}%</span>;
}

export default function OddsTable({ detail, t, status }) {
  if (!detail) return <div className="empty">{t.noSelection}</div>;
  const { match } = detail;
  return <div className="insight-body"><div className="selected-card"><small>{t.selected} · {status}</small><h3>{match.homeTeam.name} <span>vs</span> {match.awayTeam.name}</h3></div>
    <div className="market-head"><h3>{t.change}</h3><span>{t.marketCaption}</span></div>
    <table className="odds-table"><thead><tr><th>1X2</th><th>{t.home}</th><th>{t.draw}</th><th>{t.away}</th></tr></thead>
      <tbody><tr><td>Odds</td><td><strong>{match.homeWin.toFixed(2)}</strong><Movement value={match.homeChange} /></td><td><strong>{match.draw.toFixed(2)}</strong><Movement value={match.drawChange} /></td><td><strong>{match.awayWin.toFixed(2)}</strong><Movement value={match.awayChange} /></td></tr></tbody>
    </table><div className="info-grid"><Info label={t.competition} value={match.homeTeam.league} /><Info label={t.venue} value={match.venue} /><Info label={`${match.homeTeam.shortName} · ${t.form}`} value={match.homeForm} /><Info label={`${match.awayTeam.shortName} · ${t.form}`} value={match.awayForm} /></div>
  </div>;
}
function Info({ label, value }) { return <div className="info"><label>{label}</label><strong>{value}</strong></div>; }
