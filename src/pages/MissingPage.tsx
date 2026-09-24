import { Link } from "react-router-dom";
import { PageHead } from "../components/PageHead";

export function MissingPage() {
  return (
    <div className="stack">
      <PageHead title="Page not found" lede="That address does not match a section of Yomu." />
      <Link to="/">Back to today</Link>
    </div>
  );
}
