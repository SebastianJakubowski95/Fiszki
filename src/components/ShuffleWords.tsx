import classes from "./ShuffleWords.module.css";
import { useAnimate, motion } from "framer-motion";
import { myAnimationsShuffle, myAnimations02 } from "../animations/animation";
import { useDispatch } from "react-redux";
import { workingDataActions } from "../store/workingData-slice";

const ShuffleWords: React.FC<{ onShuffleWords: () => void }> = (props) => {
  const [mainShuffleWordsRef, mainShuffleWordsAnimation] = useAnimate();
  const dispatch = useDispatch();

  function onClickHandler() {
    mainShuffleWordsAnimation(mainShuffleWordsRef.current, ...myAnimations02);
    mainShuffleWordsAnimation(
      mainShuffleWordsRef.current,
      ...myAnimationsShuffle
    );
    dispatch(workingDataActions.shuffleWords());
    props.onShuffleWords();
  }

  return (
    <motion.button
      ref={mainShuffleWordsRef}
      className={classes.mainShuffleWords}
      onClick={onClickHandler}>
      <p>Shuffle Words</p>
    </motion.button>
  );
};

export default ShuffleWords;
