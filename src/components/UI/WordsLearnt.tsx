import classes from "./WordsLearnt.module.css";

const WordsLearnt = () => {
  return (
    <div className={classes.mainWordsLearnt}>
      <h2 className="primary">All words has been learnt!</h2>
      <p className="primary">
        Play again with the same words by clicking <span>"RESET WORDS" </span>
        button, or choose other words from the lists
      </p>
    </div>
  );
};

export default WordsLearnt;
