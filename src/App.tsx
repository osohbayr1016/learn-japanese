import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Shell } from "./components/Shell";
import { DrillPage } from "./pages/DrillPage";
import { GrammarLessonPage } from "./pages/GrammarLessonPage";
import { GrammarListPage } from "./pages/GrammarListPage";
import { KanaPage } from "./pages/KanaPage";
import { MissingPage } from "./pages/MissingPage";
import { TodayPage } from "./pages/TodayPage";
import { WordsPage } from "./pages/WordsPage";
import { ProgressProvider } from "./state/progress";

export function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<TodayPage />} />
            <Route path="kana" element={<KanaPage />} />
            <Route path="words" element={<WordsPage />} />
            <Route path="grammar" element={<GrammarListPage />} />
            <Route path="grammar/:id" element={<GrammarLessonPage />} />
            <Route path="drill" element={<DrillPage />} />
            <Route path="*" element={<MissingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}
