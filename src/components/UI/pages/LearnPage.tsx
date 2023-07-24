import classes from "./LearnPage.module.css";
import classNames from "classnames";
import SwapLanguage from "../../SwapLanguage";
import ShuffleWords from "../../ShuffleWords";
import LearningMode from "../../LearningMode";
import Card from "../Card";
import ClickingBar from "../ClickingBar";
import InputLearn from "../InputLearn";
import { useSelector, useDispatch } from "react-redux";
import { workingDataActions } from "../../../store/workingData-slice";
import { RootState } from "../../../store/index";
import { useState, useEffect } from "react";

const LearnPage: React.FC<{
  setIsDone: (bool: boolean) => void;
  isDone: boolean;
}> = (props) => {
  let w = window.innerWidth;
  const [isSwapped, setIsSwapped] = useState(false);
  const workingData = useSelector((state: RootState) => state.workingData);
  const [currentCard, setCurrentCard] = useState(workingData.totalWords[0]);
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.logic.learningMode);
  const [isShown, setIsShown] = useState(false);
  const [greenBorder, setGreenBorder] = useState(false);
  const [redBorder, setRedBorder] = useState(false);

  useEffect(() => {
    dispatch(workingDataActions.resetWords());
    props.setIsDone(false);
  }, []);

  function checkEnteredValue(value: string) {
    if (!isSwapped) {
      if (value.toLowerCase() === currentCard.english.toLowerCase()) {
        setGreenBorder(true);
        setIsShown(true);
        setTimeout(() => {
          setGreenBorder(false);
          onKnownWord();
        }, 2000);
      } else {
        setRedBorder(true);
        setIsShown(true);
        setTimeout(() => {
          setRedBorder(false);
          onUnknownWord();
        }, 3000);
      }
    } else if (isSwapped) {
      if (value.toLowerCase() === currentCard.polish.toLowerCase()) {
        setGreenBorder(true);
        setIsShown(true);
        setTimeout(() => {
          setGreenBorder(false);
          onKnownWord();
        }, 2000);
      } else {
        setRedBorder(true);
        setIsShown(true);
        setTimeout(() => {
          setRedBorder(false);
          onUnknownWord();
        }, 3000);
      }
    }
  }

  async function onKnownWord() {
    setIsShown(false);
    await new Promise<void>((resolve) => {
      dispatch(workingDataActions.guessedWord(currentCard));
      resolve();
    }).then(() => {
      if (workingData.totalWords.length > 1) {
        setCurrentCard(workingData.totalWords[1]);
      }
      if (workingData.totalWords.length === 0) {
        props.setIsDone(true);
      }
    });
  }

  function onUnknownWord() {
    setIsShown(false);
    if (workingData.totalWords.length > 1) {
      dispatch(workingDataActions.skipWord());
      setCurrentCard(workingData.totalWords[1]);
    }
  }

  useEffect(() => {
    if (workingData.totalWords.length > 0) {
      setCurrentCard(workingData.totalWords[0]);
    }
  }, [workingData.guessedWords, workingData.totalWords]);

  function onShuffleWords() {
    setTimeout(() => {}, 50);
    setCurrentCard(workingData.totalWords[0]);
  }

  function onSwapHandler() {
    setIsSwapped((prev) => !prev);
  }

  const learningSettings = (
    <div className={classes.modes}>
      <SwapLanguage onSwapHandler={onSwapHandler} />
      <ShuffleWords onShuffleWords={onShuffleWords} />
      <LearningMode />
    </div>
  );

  return (
    <>
      {workingData.totalWords.length > 0 ? (
        <>
          {w >= 768 && learningSettings}
          <div className={classNames(classes["main-panel"])}>
            <Card
              cardData={currentCard}
              swapped={isSwapped}
              isDone={props.isDone}
              isAnswerShown={isShown}
              greenBorder={greenBorder}
              redBorder={redBorder}
            />
            {mode === "typing" && (
              <InputLearn
                onEnteredValueCheck={checkEnteredValue}
                skipAnswering={onUnknownWord}
              />
            )}
            {mode === "clicking" && (
              <ClickingBar
                onGreen={onKnownWord}
                onRed={onUnknownWord}
                onShowClick={() => setIsShown((prev) => !prev)}
              />
            )}
          </div>
          {w < 768 && learningSettings}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default LearnPage;
