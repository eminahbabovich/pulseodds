import MatchCard from "./MatchCard";

export default function MatchList({ matches, selectedId, onSelect, language, t }) {
  if (!matches.length) return <div className="empty">{t.noData}</div>;
  return <div className="fixtures">{matches.map(match =>
    <MatchCard key={match.id} match={match} selected={match.id === selectedId} onSelect={onSelect} language={language} t={t} />)}</div>;
}
