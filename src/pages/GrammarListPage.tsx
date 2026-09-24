import { Link } from "react-router-dom";
import { PageHead } from "../components/PageHead";
import { lessons } from "../data/grammar";

export function GrammarListPage() {
  return (
    <div className="stack">
      <PageHead
        title="Grammar"
        lede="Four points that hold up almost every polite sentence in the early lessons."
      />
      <ul className="lesson-index">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link to={`/grammar/${lesson.id}`}>
              <span className="num">{lesson.number}</span>
              <span>
                <strong>{lesson.title}</strong>
                <small>{lesson.summary}</small>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
