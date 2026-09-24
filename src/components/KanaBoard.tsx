import { glyphOf, type Cell, type KanaRow, type Script } from "../data/kana";

type Props = {
  rows: KanaRow[];
  script: Script;
  current: string;
  selected: string;
  known: (char: string) => boolean;
  onSelect: (cell: Cell) => void;
};

export function KanaBoard({
  rows,
  script,
  current,
  selected,
  known,
  onSelect,
}: Props) {
  return (
    <div className="kana-board">
      {rows.map((row) => (
        <div
          key={row.label}
          id={`row-${row.label}`}
          className={row.label === current ? "kana-line is-current" : "kana-line"}
        >
          <span className="kana-label">{row.label}</span>
          {row.cells.map((cell, index) => {
            if (!cell) return <span key={`${row.label}-${index}`} className="kana-blank" />;
            const glyph = glyphOf(cell, script);
            const classes = [
              "kana-cell",
              cell.h === selected ? "is-selected" : "",
              known(glyph) ? "is-known" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={cell.h}
                type="button"
                className={classes}
                aria-pressed={cell.h === selected}
                aria-label={`${glyph} ${cell.r}`}
                onClick={() => onSelect(cell)}
              >
                <span className="glyph" lang="ja">
                  {glyph}
                </span>
                <span className="read">{cell.r}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
