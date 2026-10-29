export default function Header({ language, setLanguage, theme, setTheme, t }) {
  return <header className="top">
    <div className="brand"><div className="logo">P</div> PulseOdds <span>/ market room</span></div>
    <div className="top-right">
      <span className="live"><i />{t.liveEngine}</span>
      <div className="theme-toggle">
        <button type="button" aria-pressed={theme === "dark"} className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")}>Dark</button>
        <button type="button" aria-pressed={theme === "light"} className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")}>Light</button>
      </div>
      <div className="toggle" aria-label="Language"><button type="button" aria-pressed={language === "bs"} className={language === "bs" ? "active" : ""} onClick={() => setLanguage("bs")}>BS</button><button type="button" aria-pressed={language === "en"} className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button></div>
    </div>
  </header>;
}
