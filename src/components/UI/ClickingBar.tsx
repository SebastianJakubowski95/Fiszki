import classes from "./ClickingBar.module.css";
import classNames from "classnames";
import wrongIcon from "../../assets/wrong.svg";
import correctIcon from "../../assets/correct.svg";
import { useAnimate, motion } from "framer-motion";
import { myAnimations01 } from "../../animations/animation";

const ClickingBar: React.FC<{
  onShowClick?: () => void;
  isShown?: boolean;
  type?: string;
  onRed: () => void;
  onGreen: () => void;
}> = (props) => {
  const [wrongBtnRef, wrongBtnAnimation] = useAnimate();
  const [correctBtnRef, correctBtnAnimation] = useAnimate();

  function onWrongPressed() {
    wrongBtnAnimation(wrongBtnRef.current, ...myAnimations01);
    setTimeout(() => {
      props.onRed();
    }, 600);
  }
  function onCorrectPressed() {
    correctBtnAnimation(correctBtnRef.current, ...myAnimations01);
    setTimeout(() => {
      props.onGreen();
    }, 600);
  }

  let message;
  if (props.type === "warning") {
    message = "Are you sure?";
  } else {
    message = "Press to show answer";
  }

  return (
    <div
      className={classes.mainClickingBar}
      style={props.type === "warning" ? { boxShadow: "none" } : {}}>
      <button>
        <img
          ref={wrongBtnRef}
          src={wrongIcon}
          alt="I don't know"
          onClick={onWrongPressed}
        />
      </button>
      {props.type === "warning" ? (
        <div style={{ cursor: "auto" }}>
          <p className="primary">{message}</p>
        </div>
      ) : (
        <motion.button
          className={classNames(classes["hold-button"])}
          whileTap={{ color: "#df8420" }}
          transition={{ duration: 0.1 }}
          onClick={() => props.onShowClick!()}>
          <p className="primary text-center">{message}</p>
        </motion.button>
      )}
      <button>
        <img
          ref={correctBtnRef}
          src={correctIcon}
          alt="I do know"
          onClick={onCorrectPressed}
        />
      </button>
    </div>
  );
};

export default ClickingBar;
