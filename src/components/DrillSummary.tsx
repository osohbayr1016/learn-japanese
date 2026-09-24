type Miss = { prompt: string; answer: string; picked: string; detail: string };

type Props = {
  correct: number;
  total: number;
  misses: Miss[];
  savedCorrect: number;
  savedAnswered: number;
  onAgain: () => void;
};

export function DrillSummary({
  correct,
  total,
  misses,
  savedCorrect,
  savedAnswered,
  onAgain,
}: Props) {
  return (
    <section className="section">
      <h2>
        {correct} of {total} this round
      </h2>
      <p className="note">
        Saved total: {savedCorrect} of {savedAnswered}.
      </p>
      {misses.length > 0 ? (
        <table className="sheet">
          <thead>
            <tr>
              <th>Item</th>
              <th>Answer</th>
              <th>Your pick</th>
            </tr>
          </thead>
          <tbody>
            {misses.map((miss) => (
              <tr key={`${miss.prompt}-${miss.picked}`}>
                <td className="jp" lang="ja">
                  {miss.prompt}
                  <span className="note"> {miss.detail}</span>
                </td>
                <td>{miss.answer}</td>
                <td>{miss.picked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Every item in this round was right.</p>
      )}
      <button type="button" className="btn" onClick={onAgain}>
        Run another round
      </button>
    </section>
  );
}
