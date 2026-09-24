import { useState } from "react";
import { DrillPrompt } from "../components/DrillPrompt";
import { DrillSummary } from "../components/DrillSummary";
import { PageHead } from "../components/PageHead";
import { basicBoards } from "../data/kana";
import { words } from "../data/words";
import { makeRound, type Question } from "../lib/drill";
import { useProgress } from "../state/progress";

type Miss = { prompt: string; answer: string; picked: string; detail: string };

const cells = basicBoards.flatMap((row) => row.cells.flatMap((cell) => (cell ? [cell] : [])));

export function DrillPage() {
  const { data, recordDrill } = useProgress();
  const [round, setRound] = useState<Question[]>(() => makeRound(cells, words));
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [misses, setMisses] = useState<Miss[]>([]);
  const [done, setDone] = useState(false);

  function onPick(option: string) {
    if (picked) return;
    const question = round[index];
    setPicked(option);
    if (option !== question.answer) {
      setMisses((current) => [
        ...current,
        {
          prompt: question.prompt,
          answer: question.answer,
          picked: option,
          detail: question.detail,
        },
      ]);
    }
  }

  function onNext() {
    if (!picked) return;
    if (index + 1 >= round.length) {
      recordDrill(round.length - misses.length, round.length);
      setDone(true);
      return;
    }
    setIndex((current) => current + 1);
    setPicked(null);
  }

  function again() {
    setRound(makeRound(cells, words));
    setIndex(0);
    setPicked(null);
    setMisses([]);
    setDone(false);
  }

  return (
    <div className="stack">
      <PageHead title="Drill" lede="Eight questions. Four kana readings, four word meanings." />
      {done ? (
        <DrillSummary
          correct={round.length - misses.length}
          total={round.length}
          misses={misses}
          savedCorrect={data.drillCorrect}
          savedAnswered={data.drillAnswered}
          onAgain={again}
        />
      ) : (
        <DrillPrompt
          question={round[index]}
          index={index}
          total={round.length}
          picked={picked}
          onPick={onPick}
          onNext={onNext}
        />
      )}
    </div>
  );
}
