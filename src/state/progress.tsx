import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ProgressData = {
  kana: string[];
  words: string[];
  drillCorrect: number;
  drillAnswered: number;
};

type ProgressApi = {
  data: ProgressData;
  knowsKana: (char: string) => boolean;
  knowsWord: (id: string) => boolean;
  toggleKana: (char: string) => void;
  toggleWord: (id: string) => void;
  recordDrill: (correct: number, answered: number) => void;
  reset: () => void;
};

const KEY = "yomu-progress-v1";

const empty: ProgressData = {
  kana: [],
  words: [],
  drillCorrect: 0,
  drillAnswered: 0,
};

function load(): ProgressData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<ProgressData>;
    return {
      kana: Array.isArray(parsed.kana)
        ? parsed.kana.filter((item) => typeof item === "string")
        : [],
      words: Array.isArray(parsed.words)
        ? parsed.words.filter((item) => typeof item === "string")
        : [],
      drillCorrect:
        typeof parsed.drillCorrect === "number" ? parsed.drillCorrect : 0,
      drillAnswered:
        typeof parsed.drillAnswered === "number" ? parsed.drillAnswered : 0,
    };
  } catch {
    return empty;
  }
}

function toggle(list: string[], id: string) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProgressData>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(data));
  }, [data]);

  const api = useMemo<ProgressApi>(
    () => ({
      data,
      knowsKana: (char) => data.kana.includes(char),
      knowsWord: (id) => data.words.includes(id),
      toggleKana: (char) =>
        setData((current) => ({ ...current, kana: toggle(current.kana, char) })),
      toggleWord: (id) =>
        setData((current) => ({ ...current, words: toggle(current.words, id) })),
      recordDrill: (correct, answered) =>
        setData((current) => ({
          ...current,
          drillCorrect: current.drillCorrect + correct,
          drillAnswered: current.drillAnswered + answered,
        })),
      reset: () => setData(empty),
    }),
    [data],
  );

  return (
    <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("useProgress needs ProgressProvider");
  return value;
}
