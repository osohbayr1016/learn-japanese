import { useEffect } from "react";

export function PageHead({ title, lede }: { title: string; lede: string }) {
  useEffect(() => {
    document.title = `${title} · Yomu`;
  }, [title]);

  return (
    <header className="page-head">
      <h1>{title}</h1>
      <p className="note">{lede}</p>
    </header>
  );
}
