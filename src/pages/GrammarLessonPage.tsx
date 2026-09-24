import { Link, useParams } from "react-router-dom";
import { PageHead } from "../components/PageHead";
import { lessons } from "../data/grammar";

export function GrammarLessonPage() {
  const { id } = useParams();
  const index = lessons.findIndex((lesson) => lesson.id === id);
  const lesson = index >= 0 ? lessons[index] : undefined;

  if (!lesson) {
    return (
      <div className="stack">
        <PageHead title="Page not found" lede="That lesson is not one of the four notes." />
        <Link to="/grammar">Back to grammar</Link>
      </div>
    );
  }

  const prev = lessons[index - 1];
  const next = lessons[index + 1];

  return (
    <article className="stack">
      <PageHead title={`${lesson.number}. ${lesson.title}`} lede={lesson.summary} />
      <div className="prose">
        {lesson.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <section className="section">
        <h2>Examples</h2>
        <ol className="examples">
          {lesson.examples.map((example) => (
            <li key={example.jp}>
              <p className="jp" lang="ja">
                {example.jp}
              </p>
              <p className="note" lang="ja">
                {example.reading}
              </p>
              <p>{example.en}</p>
            </li>
          ))}
        </ol>
      </section>
      <aside className="callout">
        <h2>Watch</h2>
        <p>{lesson.note}</p>
      </aside>
      <nav className="pager" aria-label="Lessons">
        {prev ? (
          <Link to={`/grammar/${prev.id}`}>
            {prev.number}. {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/grammar/${next.id}`}>
            {next.number}. {next.title}
          </Link>
        ) : (
          <Link to="/grammar">All notes</Link>
        )}
      </nav>
    </article>
  );
}
