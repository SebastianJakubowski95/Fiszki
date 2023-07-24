import classes from "./WordsCounter.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { workingDataActions } from "../../store/workingData-slice";

const WordsCounter = () => {
  const workingData = useSelector((state: RootState) => state.workingData);
  const dispatch = useDispatch();

  const [numOfAllWords, setNumOfAllWords] = useState(
    workingData.totalWords.length + workingData.guessedWords.length
  );
  const [guessedWords, setGuessedWords] = useState(workingData.guessedWords);
  const [wordsLeft, setWordsLeft] = useState(
    numOfAllWords - workingData.guessedWords.length
  );
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    dispatch(workingDataActions.resetWords());
    dispatch(workingDataActions.resetGuessedWords());
  }, []);

  useEffect(() => {
    setNumOfAllWords(
      workingData.totalWords.length + workingData.guessedWords.length
    );
  }, [workingData.totalWords.length]);

  useEffect(() => {
    setGuessedWords(workingData.guessedWords);
  }, [workingData.guessedWords]);

  useEffect(() => {
    setWordsLeft(numOfAllWords - guessedWords.length);
  }, [numOfAllWords, guessedWords]);

  useEffect(() => {
    const newPercent = (guessedWords.length / numOfAllWords) * 100;
    setPercent(newPercent);
  }, [guessedWords.length, numOfAllWords]);

  return (
    <div className={classes.mainWordsCounter}>
      <p className="actions">{`words left: ${wordsLeft} / ${numOfAllWords}`}</p>
      <p>{`${percent.toFixed(0)}%`}</p>
    </div>
  );
};

export default WordsCounter;
