import classes from "./Pill.module.css";
import classNames from "classnames";
import Checkbox from "../Checkbox";
import deleteIcon from "../../assets/wrong.svg";
import settingsIcon from "../../assets/settings.svg";
import { useEffect } from "react";
import { useAnimate } from "framer-motion";
import {
  myAnimations01,
  myAnimations02,
  myAnimationsSettings,
} from "../../animations/animation";
import { dataItem } from "../../models/dataItem";
import { WordsPair } from "../../models/dataItem";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../store/data-slice";
import { logicActions } from "../../store/logic-slice";
import { workingDataActions } from "../../store/workingData-slice";
import { RootState } from "../../store";

const Pill: React.FC<{
  type: "list" | "word";
  listData?: dataItem;
  wordsPair?: WordsPair;
  kind?: string;
}> = (props) => {
  const [deleteRef, deleteAnimation] = useAnimate();
  const [settingsRef, settingsAnimation] = useAnimate();
  const [newPillRef] = useAnimate();
  const [titlePillRef, titlePillAnimation] = useAnimate();
  // const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const workingData = useSelector((state: RootState) => state.workingData);
  const data = useSelector((state: RootState) => state.data);
  // const logic = useSelector((state: RootState) => state.logic);

  function selectList() {
    const list = data.filter(
      (list) => list.listId === props.listData?.listId
    )[0];
    if (!props.listData?.isListChecked) {
      dispatch(workingDataActions.addList(props.listData));
      dispatch(workingDataActions.addWords(list.wordsList));
    } else {
      dispatch(workingDataActions.removeList(props.listData));
      //removeWords
      dispatch(workingDataActions.removeWords(list.wordsList)); //[words]
      console.log("LINE-72");
    }
    titlePillAnimation(titlePillRef.current, ...myAnimations02);
    dispatch(dataActions.checkList(props.listData?.listId));
  }

  useEffect(() => {
    if (workingData.lists.length > 0) {
      dispatch(workingDataActions.setListTitle(workingData.lists[0].listTitle));
    } else {
      dispatch(
        workingDataActions.setListTitle("Add some lists to learn from!")
      );
    }
  }, [selectList]);

  function deleteActions() {
    deleteAnimation(deleteRef.current, ...myAnimations01);
    const wordsList = props.listData?.wordsList;
    const word = [props.wordsPair];
    setTimeout(() => {
      if (props.type === "list") {
        dispatch(
          logicActions.setIdToDelete({
            id: props.listData!.listId,
            kind: "",
            isItList: true,
          })
        );
        if (props.kind === "header") {
          dispatch(
            logicActions.setIdToDelete({
              id: props.listData!.listId,
              kind: "listHeader",
            })
          );
        }
        dispatch(logicActions.showDeleteModal());
        dispatch(workingDataActions.setWords2delete(wordsList));
      } else if (props.type === "word") {
        dispatch(
          logicActions.setIdToDelete({ id: props.wordsPair!.wordId, kind: "" })
        );
        dispatch(logicActions.showDeleteModal());
        dispatch(workingDataActions.setWords2delete(word));
      }
    }, 200);
  }

  function settingsAction() {
    settingsAnimation(settingsRef.current, ...myAnimationsSettings);
    if (props.type === "list") {
      setTimeout(() => {
        dispatch(logicActions.setListId(props.listData?.listId));
        dispatch(logicActions.setPage("wordsPage"));
      }, 800);
    } else if (props.type === "word") {
      setTimeout(() => {
        dispatch(logicActions.setWordId(props.wordsPair?.wordId)); // wrong id? not via props
        dispatch(logicActions.showWordSettingsModal());
      }, 100);
    }
  }

  return (
    <>
      <div className={classes.mainPill} ref={newPillRef}>
        <button
          ref={titlePillRef}
          className={classNames(
            classes.titlePill,
            props.kind === "header" && classes.header
          )}
          style={props.type === "word" ? { cursor: "auto" } : {}}
          onClick={props.type === "list" ? selectList : () => {}}>
          {props.type === "list" && <Checkbox listData={props.listData} />}
          <div style={{ width: "100%" }}>
            {props.type === "list" && (
              <h2 className={classes["first-word"]}>
                {props.listData?.listTitle}
              </h2>
            )}
            {props.type === "word" && (
              <>
                <h2 className={classes["first-word"]}>
                  {props.wordsPair?.polish}
                </h2>
                <h2 className={classes["second-word"]}>
                  {props.wordsPair?.english}
                </h2>
              </>
            )}
          </div>
        </button>

        <button>
          <img
            ref={deleteRef}
            onClick={deleteActions}
            src={deleteIcon}
            className={`${classes["action-btn"]} ${classes["delete"]}`}
            alt="delete"
          />
        </button>
        {!props.kind && (
          <button>
            <img
              ref={settingsRef}
              onClick={settingsAction}
              src={settingsIcon}
              className={`${classes["action-btn"]} ${classes["settings"]}`}
              alt="settings"
            />
          </button>
        )}
      </div>
    </>
  );
};

export default Pill;
