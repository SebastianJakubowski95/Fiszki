import classes from "./WordsPage.module.css";
import ContentHeader from "../../ContentHeader";
import Pill from "../Pill";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const WordsPage = () => {
  const data = useSelector((state: RootState) => state.data);
  const logic = useSelector((state: RootState) => state.logic);
  const listId = logic.currentListId;
  const wordsArr = data.filter((list) => list.listId === listId)[0].wordsList;
  const listData = data.filter((list) => list.listId === listId)[0];

  const listOfWords: any = wordsArr.map((item, index) => {
    return (
      <li key={index}>
        <Pill type="word" wordsPair={item} />
      </li>
    );
  });

  return (
    <div className={classes.mainWordsPage}>
      <ContentHeader page="word" />
      <div className={classes.div1}>
        <Pill type="list" listData={listData} kind="header" />
        <div className={classes.window}>
          <ul className={classes.list}>{listOfWords}</ul>
        </div>
      </div>
    </div>
  );
};

export default WordsPage;
