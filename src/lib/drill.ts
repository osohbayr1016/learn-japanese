import { basicBoards, type Cell } from "../data/kana";
import type { Word } from "../data/words";

export type Question = {
  id: string;
  kind: "kana" | "word";
  prompt: string;
  detail: string;
  answer: string;
  options: string[];
};

function shuffle<T>(list: T[]): T[] {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function choices(answer: string, preferred: string[], all: string[]) {
  const pool = [
    ...shuffle(preferred.filter((item) => item !== answer)),
    ...shuffle(all.filter((item) => item !== answer)),
  ];
  const picked: string[] = [];
  for (const item of pool) {
    if (picked.length === 3) break;
    if (!picked.includes(item)) picked.push(item);
  }
  return shuffle([answer, ...picked]);
}

function kanaQuestion(cell: Cell, readings: string[]): Question {
  const mates =
    basicBoards
      .find((row) => row.cells.some((item) => item?.h === cell.h))
      ?.cells.flatMap((item) => (item ? [item.r] : [])) ?? [];
  return {
    id: `kana-${cell.h}`,
    kind: "kana",
    prompt: cell.h,
    detail: `${cell.hw} · ${cell.hr} · ${cell.he}`,
    answer: cell.r,
    options: choices(cell.r, mates, readings),
  };
}

function wordQuestion(word: Word, meanings: string[]): Question {
  return {
    id: `word-${word.id}`,
    kind: "word",
    prompt: word.jp,
    detail: word.reading,
    answer: word.en,
    options: choices(word.en, [], meanings),
  };
}

export function makeRound(cells: Cell[], list: Word[]): Question[] {
  const readings = cells.map((cell) => cell.r);
  const meanings = list.map((word) => word.en);
  const kana = shuffle(cells)
    .slice(0, 4)
    .map((cell) => kanaQuestion(cell, readings));
  const vocab = shuffle(list)
    .slice(0, 4)
    .map((word) => wordQuestion(word, meanings));
  return shuffle([...kana, ...vocab]);
}
