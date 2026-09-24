import { glyphOf, type Cell, type Script } from "../data/kana";

type Props = {
  cell: Cell | null;
  script: Script;
  known: boolean;
  onToggle: (char: string) => void;
};

export function KanaPanel({ cell, script, known, onToggle }: Props) {
  if (!cell) {
    return (
      <aside className="panel">
        <p>Choose a character.</p>
      </aside>
    );
  }

  const glyph = glyphOf(cell, script);

  return (
    <aside className="panel">
      <p className="panel-char" lang="ja">
        {glyph}
      </p>
      <p className="panel-read">{cell.r}</p>
      <p className="pair" lang="ja">
        {cell.h} {cell.k}
      </p>
      <div className="panel-block">
        <h2>Example</h2>
        <p lang="ja">{cell.hw}</p>
        <p className="note">{cell.hr}</p>
        <p>{cell.he}</p>
      </div>
      <div className="panel-block">
        <h2>Loanword</h2>
        <p lang="ja">{cell.kw}</p>
        <p className="note">{cell.kr}</p>
        <p>{cell.ke}</p>
      </div>
      {cell.note ? <p className="note">{cell.note}</p> : null}
      <button type="button" className="btn" onClick={() => onToggle(glyph)}>
        {known ? "Mark as still learning" : "I can read this"}
      </button>
    </aside>
  );
}
