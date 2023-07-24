import { WordsPair } from "../../models/dataItem";
import classes from "./Card.module.css";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

const Card: React.FC<{
  isAnswerShown: boolean;
  cardData: WordsPair;
  swapped: boolean;
  isDone: boolean;
  greenBorder: boolean;
  redBorder: boolean;
}> = (props) => {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        className={classNames(
          classes.mainCard,
          props.greenBorder === true && classes["green-border"],
          props.redBorder === true && classes["red-border"]
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}>
        <p className={classes["first-word"]}>
          {props.isDone === false &&
            props.swapped === false &&
            props.cardData.polish}
          {props.isDone === false &&
            props.swapped === true &&
            props.cardData.english}
        </p>
        <p
          className={classNames(
            classes["second-word"],
            !props.isAnswerShown && classes.hide
          )}>
          {props.isDone === false &&
            props.swapped === false &&
            props.cardData.english}
          {props.isDone === false &&
            props.swapped === true &&
            props.cardData.polish}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Card;
