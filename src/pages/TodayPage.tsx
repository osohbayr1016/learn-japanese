import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHead } from "../components/PageHead";
import { basicBoards, basicHiragana, nextBasicRow } from "../data/kana";
import { words } from "../data/words";
import { useProgress } from "../state/progress";

export function TodayPage() {
  const { data, reset } = useProgress();
  const [ask, setAsk] = useState(false);
  const row = nextBasicRow(data.kana);
  const openWords = words.filter((word) => !data.words.includes(word.id)).slice(0, 5);
  const marked = data.kana.filter((char) => basicHiragana.includes(char)).length;
  const drill =
    data.drillAnswered === 0
      ? "No round yet"
      : `${data.drillCorrect} / ${data.drillAnswered}`;

  return (
    <div className="stack">
      <PageHead
        title="Today"
        lede="The next unread hiragana row, then words that are still open."
      />
      <section className="section">
        {row ? (
          <>
            <h2>Next row, {row.label}</h2>
            <div className="big-row">
              {row.cells.flatMap((cell) =>
                cell ? (
                  <div key={cell.h}>
                    <span className="big-char" lang="ja">
                      {cell.h}
                    </span>
                    <span className="big-read">{cell.r}</span>
                  </div>
                ) : [],
              )}
            </div>
            <Link className="btn" to={`/kana?row=${row.label}`}>
              Study {row.label}
            </Link>
          </>
        ) : (
          <>
            <h2>Basic hiragana is marked</h2>
            <p className="note">
              All 46 sounds are checked. Voiced marks are on the Kana page. The word list is the next place to work.
            </p>
          </>
        )}
      </section>
      <section className="section">
        <h2>So far</h2>
        <dl className="ledger">
          <div>
            <dt>Basic hiragana</dt>
            <dd>
              {marked} / {basicHiragana.length}
            </dd>
          </div>
          <div>
            <dt>Words marked</dt>
            <dd>
              {data.words.length} / {words.length}
            </dd>
          </div>
          <div>
            <dt>Drill</dt>
            <dd>{drill}</dd>
          </div>
        </dl>
      </section>
      <section className="section">
        <h2>Words still open</h2>
        {openWords.length === 0 ? (
          <p className="note">Every word on the list is marked.</p>
        ) : (
          <table className="sheet">
            <thead>
              <tr>
                <th>Word</th>
                <th>Reading</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {openWords.map((word) => (
                <tr key={word.id}>
                  <td className="jp" lang="ja">
                    {word.jp}
                  </td>
                  <td lang="ja">{word.reading}</td>
                  <td>{word.en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Link to="/words">Open the word list</Link>
      </section>
      <section className="section">
        <h2>Hiragana rows</h2>
        <table className="sheet">
          <thead>
            <tr>
              <th>Row</th>
              <th>Characters</th>
              <th>Marked</th>
            </tr>
          </thead>
          <tbody>
            {basicBoards.map((item) => {
              const cells = item.cells.flatMap((cell) => (cell ? [cell] : []));
              const count = cells.filter((cell) => data.kana.includes(cell.h)).length;
              return (
                <tr key={item.label} className={row?.label === item.label ? "is-current" : ""}>
                  <td>
                    <Link to={`/kana?row=${item.label}`}>{item.label}</Link>
                  </td>
                  <td className="jp" lang="ja">
                    {cells.map((cell) => cell.h).join(" ")}
                  </td>
                  <td>
                    {count} / {cells.length}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <div className="clear-row">
        {ask ? (
          <p>
            Clear every mark stored in this browser?{" "}
            <button type="button" className="btn" onClick={reset}>
              Clear
            </button>{" "}
            <button type="button" className="btn secondary" onClick={() => setAsk(false)}>
              Keep
            </button>
          </p>
        ) : (
          <button type="button" className="btn secondary" onClick={() => setAsk(true)}>
            Clear marks
          </button>
        )}
      </div>
    </div>
  );
}
