import classes from "./EntireBar.module.css";
import UpperBar from "./UpperBar";
import WordsCounter from "./WordsCounter";
import Button from "../Button";
import WordsLearnt from "./WordsLearnt";
import { useSelector, useDispatch } from "react-redux";
import { workingDataActions } from "../../store/workingData-slice";
import { RootState } from "../../store";
import { useEffect } from "react";

const EntireBar: React.FC<{
  setOnStartLearning: (boolean: boolean) => void;
}> = (props) => {
  const workingData = useSelector((state: RootState) => state.workingData);
  const currentPage = useSelector(
    (state: RootState) => state.logic.currentPage
  );
  const dispatch = useDispatch();

  function onResetWords() {
    dispatch(workingDataActions.resetWords());
    props.setOnStartLearning(false);
  }

  useEffect(() => {
    dispatch(workingDataActions.resetWords());
  }, []);

  const condition1 =
    currentPage === "learnPage" && workingData.totalWords.length > 0;
  const condition2 =
    currentPage === "learnPage" && workingData.guessedWords.length > 0;
  const condition3 =
    currentPage === "learnPage" &&
    workingData.guessedWords.length > 0 &&
    workingData.totalWords.length === 0;

  return (
    <div className={classes.mainEntireBar}>
      <UpperBar
        isRenameIcon={currentPage !== "learnPage"}
        setOnStartLearning={() => props.setOnStartLearning(true)}
      />
      {(condition1 || condition2) && (
        <div style={workingData.lists.length > 0 ? {} : { opacity: "0" }}>
          <Button type="resetWords" onClick={onResetWords}>
            RESET WORDS
          </Button>
          <WordsCounter />
        </div>
      )}
      {condition3 && <WordsLearnt />}
    </div>
  );
};

export default EntireBar;
