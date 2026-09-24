import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { KanaBoard } from "../components/KanaBoard";
import { KanaPanel } from "../components/KanaPanel";
import { PageHead } from "../components/PageHead";
import {
  boardsFor,
  glyphOf,
  type Cell,
  type KanaSet,
  type Script,
} from "../data/kana";
import { useProgress } from "../state/progress";

function firstCell(rows: ReturnType<typeof boardsFor>, label: string | null): Cell | null {
  const match = label ? rows.find((row) => row.label === label) : rows[0];
  const row = match ?? rows[0];
  return row.cells.find((cell): cell is Cell => cell !== null) ?? null;
}

export function KanaPage() {
  const [params] = useSearchParams();
  const { knowsKana, toggleKana } = useProgress();
  const [script, setScript] = useState<Script>("hiragana");
  const [setName, setSetName] = useState<KanaSet>("basic");
  const rows = boardsFor(setName);
  const requested = params.get("row");
  const [selected, setSelected] = useState<string | null>(null);

  const active = useMemo(() => {
    const found = rows.flatMap((row) => row.cells).find((cell) => cell?.h === selected);
    return found ?? firstCell(rows, requested);
  }, [rows, selected, requested]);

  const current = rows.find((row) => row.cells.some((cell) => cell?.h === active?.h));

  return (
    <div className="stack">
      <PageHead
        title="Kana"
        lede="Forty-six basic sounds, then the voiced marks. Marks are stored per character, so あ and ア stay separate."
      />
      <div className="toolbar">
        <div className="segment" role="group" aria-label="Script">
          {(["hiragana", "katakana"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={script === item}
              onClick={() => setScript(item)}
            >
              {item === "hiragana" ? "Hiragana" : "Katakana"}
            </button>
          ))}
        </div>
        <div className="segment" role="group" aria-label="Set">
          {(["basic", "voiced"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={setName === item}
              onClick={() => {
                setSetName(item);
                setSelected(null);
              }}
            >
              {item === "basic" ? "Basic" : "Voiced"}
            </button>
          ))}
        </div>
      </div>
      <p className="note">
        Small っ, combinations such as きゃ, and the long-vowel mark ー come after this grid.
      </p>
      <div className="kana-layout">
        <KanaBoard
          rows={rows}
          script={script}
          current={current?.label ?? ""}
          selected={active?.h ?? ""}
          known={knowsKana}
          onSelect={(cell) => setSelected(cell.h)}
        />
        <KanaPanel
          cell={active}
          script={script}
          known={active ? knowsKana(glyphOf(active, script)) : false}
          onToggle={toggleKana}
        />
      </div>
    </div>
  );
}
