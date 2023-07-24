import classes from "./ListPage.module.css";
import ContentHeader from "../../ContentHeader";
import Button from "../../Button";
import Pill from "../Pill";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logicActions } from "../../../store/logic-slice";
import { RootState } from "../../../store";
import { workingDataActions } from "../../../store/workingData-slice";
import { dataActions } from "../../../store/data-slice";

const ListPage: React.FC<{
  setOnStartLearning: (boolean: boolean) => void;
  learningInProgress: boolean;
}> = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const workingData = useSelector((state: RootState) => state.workingData);
  const [numAllWords, setNumAllWords] = useState(
    workingData.totalWords.length > 0 ? workingData.totalWords.length : 0
  );

  useEffect(() => {
    setNumAllWords(workingData.totalWords.length);
  }, [workingData.lists]);

  useEffect(() => {
    if (props.learningInProgress) {
      setNumAllWords(workingData.totalWords.length);
    }
  }, [workingData.totalWords.length, workingData.guessedWords.length]);

  useEffect(() => {
    dispatch(logicActions.setPage("listPage"));
  }, []);

  function onClearSelected() {
    dispatch(workingDataActions.resetSelectedLists());
    dispatch(dataActions.resetSelectedLists());
  }

  const listOfLists: JSX.Element[] = data.map((item, index) => (
    <li key={index}>
      <Pill type="list" listData={item} />
    </li>
  ));

  function onLearn() {
    dispatch(logicActions.setPage("learnPage"));
    dispatch(workingDataActions.resetWords());
    if (workingData.totalWords.length > 0) {
      props.setOnStartLearning(true);
    }
  }

  return (
    <div className={classes.mainListPage}>
      <ContentHeader page="lists" />
      <div className={classes["list-page-container-02"]}>
        <div className={classes.window}>
          <ul className={classes.list}>{listOfLists}</ul>
        </div>
        <div className={classes.data}>
          <h2>{`Words to learn: ${numAllWords}`}</h2>
        </div>
        <div className={classes["action-btns"]}>
          <div className={classes["reset-actions"]}>
            <Button type="resetWords" onClick={onClearSelected}>
              CLEAR SELECTED
            </Button>
          </div>
          <Button type="default" onClick={onLearn}>
            Learn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
