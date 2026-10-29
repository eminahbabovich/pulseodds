export default function FilterBar({ filter, setFilter, search, setSearch, t }) {
  const filters = [["ALL", t.all], ["LIVE", t.live], ["UPCOMING", t.upcoming], ["FINISHED", t.finished]];
  return <><div className="filters">{filters.map(([key, label]) =>
    <button type="button" key={key} className={`filter ${filter === key ? "active" : ""}`} onClick={() => setFilter(key)}>{label}</button>)}</div>
    <label className="search"><span>⌕</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder={t.search} /></label></>;
}
