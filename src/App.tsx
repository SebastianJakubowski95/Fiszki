import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import EntireBar from "./components/UI/EntireBar";
import LearnPage from "./components/UI/pages/LearnPage";
import ListPage from "./components/UI/pages/ListPage";
import WordsPage from "./components/UI/pages/WordsPage";
import WordSettingsModal from "./components/UI/modals/WordSettingsModal";
import NewWordModal from "./components/UI/modals/NewWordModal";
import NewListModal from "./components/UI/modals/NewListModal";
import RenameListModal from "./components/UI/modals/RenameListModal";
import DeleteModal from "./components/UI/modals/DeleteModal";

function App() {
  const logic = useSelector((state: RootState) => state.logic);
  const [learningInProgress, setLearningInProgress] = useState(false);

  function onLearnFun() {
    return (
      <LearnPage
        setIsDone={(bool) => setLearningInProgress(bool)}
        isDone={learningInProgress}
      />
    );
  }

  return (
    <>
      {logic.showWordSettingsModal && <WordSettingsModal />}
      {logic.showNewWordModal && <NewWordModal />}
      {logic.showNewListModal && <NewListModal />}
      {logic.showRenameListModal && <RenameListModal />}
      {logic.showDeleteModal && <DeleteModal />}
      <EntireBar
        setOnStartLearning={(boolean: boolean) =>
          setLearningInProgress(boolean)
        }
      />
      {logic.currentPage === "learnPage" && onLearnFun()}
      {logic.currentPage === "listPage" && (
        <div className="center">
          <ListPage
            setOnStartLearning={(boolean: boolean) =>
              setLearningInProgress(boolean)
            }
            learningInProgress={learningInProgress}
          />
        </div>
      )}
      {logic.currentPage === "wordsPage" && <WordsPage />}
    </>
  );
}

export default App;
