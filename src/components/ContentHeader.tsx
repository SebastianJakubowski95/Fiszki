import classes from "./ContentHeader.module.css";
import classNames from "classnames";
import React from "react";
import { useAnimate } from "framer-motion";
import { myAnimations01 } from "../animations/animation";
import Button from "./Button";
import arrowBackIcon from "../assets/arrowBack.svg";
import searchIcon from "../assets/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { logicActions } from "../store/logic-slice";
import { RootState } from "../store";

const ContentHeader: React.FC<{ page: string }> = (props) => {
  let w = window.innerWidth;
  const dispatch = useDispatch();
  const logic = useSelector((state: RootState) => state.logic);
  const data = useSelector((state: RootState) => state.data);
  const [backIconRef, backIconAnimation] = useAnimate();
  const [searchIconRef, searchIconAnimation] = useAnimate();

  function onGoBack() {
    backIconAnimation(backIconRef.current, ...myAnimations01);
    dispatch(logicActions.setPage("listPage"));
  }
  function onSearch() {
    searchIconAnimation(searchIconRef.current, ...myAnimations01);
  }

  function onAddNewHandler() {
    if (logic.currentPage === "listPage") {
      dispatch(logicActions.showNewListModal());
    } else if (logic.currentPage === "wordsPage") {
      dispatch(logicActions.showNewWordModal());
    }
  }

  let titleInfo, num;
  switch (logic.currentPage) {
    case "listPage":
      titleInfo = "Lists:";
      num = data.length;
      break;
    case "wordsPage":
      titleInfo = "Words:";
      const list = data.filter(
        (list) => list.listId === logic.currentListId
      )[0];
      num = list.wordsList.length;
      break;
  }

  return (
    <div className={classes.mainContentHeader}>
      <div>
        <button style={w < 768 ? { width: "fit-content" } : {}}>
          <img
            ref={backIconRef}
            onClick={onGoBack}
            className={classNames(
              classes.back,
              props.page === "lists" && classes["hide-arrow"]
            )}
            src={arrowBackIcon}
            alt="go back"
          />
        </button>
        <h2>{`${titleInfo} ${num}`}</h2>
        <button style={w < 768 ? { width: "fit-content" } : {}}>
          <img
            ref={searchIconRef}
            onClick={onSearch}
            className={classes.search}
            src={searchIcon}
            alt="search"
          />
        </button>
      </div>
      <Button type="addNew" onClick={onAddNewHandler}>
        <h2>Add New</h2>
      </Button>
    </div>
  );
};

export default ContentHeader;
