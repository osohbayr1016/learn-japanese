import type { Question } from "../lib/drill";

type Props = {
  question: Question;
  index: number;
  total: number;
  picked: string | null;
  onPick: (option: string) => void;
  onNext: () => void;
};

export function DrillPrompt({ question, index, total, picked, onPick, onNext }: Props) {
  const ask = question.kind === "kana" ? "How is this read?" : "What does this mean?";

  return (
    <section className="section drill">
      <p className="note">
        {index + 1} of {total}
      </p>
      <p className="prompt-char" lang="ja">
        {question.prompt}
      </p>
      <h2>{ask}</h2>
      <div className="options">
        {question.options.map((option) => {
          const correct = picked !== null && option === question.answer;
          const wrong = picked === option && option !== question.answer;
          const name = ["drill-option", correct ? "is-correct" : "", wrong ? "is-wrong" : ""]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={option}
              type="button"
              className={name}
              disabled={picked !== null}
              onClick={() => onPick(option)}
            >
              {option}
              {correct ? " (correct)" : ""}
              {wrong ? " (your pick)" : ""}
            </button>
          );
        })}
      </div>
      {picked ? <p className="note">{question.detail}</p> : null}
      <button type="button" className="btn" disabled={!picked} onClick={onNext}>
        {index + 1 === total ? "See result" : "Next"}
      </button>
    </section>
  );
}
