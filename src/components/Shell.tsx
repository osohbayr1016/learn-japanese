import { NavLink, Outlet } from "react-router-dom";
import { basicHiragana } from "../data/kana";
import { useProgress } from "../state/progress";

const links = [
  { to: "/", label: "Today", end: true },
  { to: "/kana", label: "Kana", end: false },
  { to: "/words", label: "Words", end: false },
  { to: "/grammar", label: "Grammar", end: false },
  { to: "/drill", label: "Drill", end: false },
];

export function Shell() {
  const { data } = useProgress();
  const marked = data.kana.filter((char) => basicHiragana.includes(char)).length;

  return (
    <div className="app">
      <aside className="sidebar">
        <NavLink className="brand" to="/" end>
          <span className="brand-mark" lang="ja">
            よ
          </span>
          <span>
            <strong>Yomu</strong>
            <small>Japanese study desk</small>
          </span>
        </NavLink>
        <nav className="nav" aria-label="Sections">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <p className="rail-note">
          <b>
            {marked} / {basicHiragana.length}
          </b>
          <span>basic hiragana marked</span>
        </p>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
