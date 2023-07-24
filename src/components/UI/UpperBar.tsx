import classes from "./UpperBar.module.css";
import renameIcon from "../../assets/rename.svg";
import Button from "../Button";
import { myAnimations01 } from "../../animations/animation";
import { useAnimate } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { logicActions } from "../../store/logic-slice";
import { workingDataActions } from "../../store/workingData-slice";
import { useEffect } from "react";

const UpperBar: React.FC<{
  isRenameIcon: boolean;
  setOnStartLearning: (boolean: boolean) => void;
}> = (props) => {
  const [renameIconRef, renameIconAnimation] = useAnimate();
  const dispatch = useDispatch();

  const workingData = useSelector((state: RootState) => state.workingData);
  const logic = useSelector((state: RootState) => state.logic);
  const data = useSelector((state: RootState) => state.data);

  let headerTitle;
  switch (logic.currentPage) {
    case "learnPage":
      if (workingData.listTitle.trim() === "") {
        headerTitle = "Add some lists to learn from!";
      } else {
        if (workingData.selectedLists > 1) {
          headerTitle = `${workingData.listTitle}, ...`;
        } else {
          headerTitle = workingData.listTitle;
        }
      }
      break;
    case "listPage":
      headerTitle = "My lists";
      break;
    case "wordsPage":
      const list = data.filter(
        (list) => list.listId === logic.currentListId
      )[0];
      const listTitle = list.listTitle;
      headerTitle = listTitle;
      break;
  }

  function onRenameHandler() {
    renameIconAnimation(renameIconRef.current, ...myAnimations01);
    dispatch(logicActions.showRenameListModal());
  }

  function onLearnHandler() {
    dispatch(workingDataActions.resetWords());
    dispatch(logicActions.setPage("learnPage"));
    if (workingData.totalWords.length > 0) {
      props.setOnStartLearning(true);
    }
  }
  useEffect(() => {
    dispatch(workingDataActions.resetWords());
  }, [logic.currentPage]);

  return (
    <div className={classes.mainUpperBar}>
      <div>
        <h1>{headerTitle}</h1>
        {props.isRenameIcon === true && logic.currentPage === "wordsPage" && (
          <button>
            <img
              ref={renameIconRef}
              onClick={onRenameHandler}
              src={renameIcon}
              alt="rename"
            />
          </button>
        )}
      </div>
      <div>
        {props.isRenameIcon === true ? (
          <Button type="default" onClick={onLearnHandler}>
            Learn
          </Button>
        ) : (
          <Button
            type="default"
            onClick={() => dispatch(logicActions.setPage("listPage"))}>
            My lists
          </Button>
        )}
        <Button type="login" onClick={() => console.log("logged out")}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default UpperBar;
