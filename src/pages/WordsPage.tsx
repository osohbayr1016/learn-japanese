import { useMemo, useState } from "react";
import { PageHead } from "../components/PageHead";
import { words } from "../data/words";
import { useProgress } from "../state/progress";

type Filter = "all" | "learning" | "known";

export function WordsPage() {
  const { knowsWord, toggleWord } = useProgress();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return words.filter((word) => {
      const known = knowsWord(word.id);
      if (filter === "known" && !known) return false;
      if (filter === "learning" && known) return false;
      if (!needle) return true;
      return [word.jp, word.reading, word.en, word.pos].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [query, filter, knowsWord]);

  return (
    <div className="stack">
      <PageHead
        title="Words"
        lede="Twenty-four words from the first lessons, each with one sentence."
      />
      <div className="toolbar">
        <input
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search word, reading, meaning"
          aria-label="Search words"
          autoComplete="off"
        />
        <div className="segment" role="group" aria-label="Filter">
          {(
            [
              ["all", "All"],
              ["learning", "Still learning"],
              ["known", "Marked"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {shown.length === 0 ? (
        <p className="note">Nothing in this list matches.</p>
      ) : (
        <ul className="word-list">
          {shown.map((word) => {
            const known = knowsWord(word.id);
            return (
              <li key={word.id} className="word">
                <div>
                  <p className="word-jp" lang="ja">
                    {word.jp}
                  </p>
                  <p className="note" lang="ja">
                    {word.reading} · {word.pos}
                  </p>
                  <p>{word.en}</p>
                  <p className="sentence" lang="ja">
                    {word.sentence}
                  </p>
                  <p className="note" lang="ja">
                    {word.sentenceReading}
                  </p>
                  <p className="note">{word.sentenceEn}</p>
                </div>
                <button type="button" className="btn secondary" onClick={() => toggleWord(word.id)}>
                  {known ? "Marked" : "Mark known"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
