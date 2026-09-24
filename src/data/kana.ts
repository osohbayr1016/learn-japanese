import {
  basicCells,
  basicLayout,
  voicedCells,
  voicedLayout,
} from "./kana-data";

export type Script = "hiragana" | "katakana";
export type KanaSet = "basic" | "voiced";

export type Cell = {
  h: string;
  k: string;
  r: string;
  hw: string;
  hr: string;
  he: string;
  kw: string;
  kr: string;
  ke: string;
  note?: string;
};

export type KanaRow = { label: string; cells: (Cell | null)[] };

function parseCells(block: string): Cell[] {
  return block
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [h, k, r, hw, hr, he, kw, kr, ke, note] = line
        .split("|")
        .map((part) => part.trim());
      return { h, k, r, hw, hr, he, kw, kr, ke, note: note || undefined };
    });
}

function board(layout: string, cells: Cell[]): KanaRow[] {
  const byH = new Map(cells.map((cell) => [cell.h, cell]));
  return layout
    .trim()
    .split("\n")
    .map((line) => {
      const rowCells = line
        .trim()
        .split(/\s+/)
        .map((token) => (token === "." ? null : byH.get(token) ?? null));
      const first = rowCells.find((cell) => cell);
      return { label: first?.r ?? "", cells: rowCells };
    });
}

export const basicBoards = board(basicLayout, parseCells(basicCells));
export const voicedBoards = board(voicedLayout, parseCells(voicedCells));

export const basicHiragana = basicBoards.flatMap((row) =>
  row.cells.flatMap((cell) => (cell ? [cell.h] : [])),
);

export function boardsFor(set: KanaSet): KanaRow[] {
  return set === "basic" ? basicBoards : voicedBoards;
}

export function glyphOf(cell: Cell, script: Script): string {
  return script === "hiragana" ? cell.h : cell.k;
}

export function nextBasicRow(known: string[]): KanaRow | null {
  return (
    basicBoards.find((row) =>
      row.cells.some((cell) => cell && !known.includes(cell.h)),
    ) ?? null
  );
}
