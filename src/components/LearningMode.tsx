import classes from "./LearningMode.module.css";
import swapIcon from "../assets/swap.svg";
import { myAnimationsRotate360 } from "../animations/animation";
import { useAnimate, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { logicActions } from "../store/logic-slice";

const LearningMode = () => {
  let w = window.innerWidth;
  const [swapIconRef, swapIconAnimation] = useAnimate();
  const dispatch = useDispatch();
  const activeMode = useSelector(
    (state: RootState) => state.logic.learningMode
  );

  function onSwapHandler() {
    dispatch(logicActions.changeMode());
    swapIconAnimation(swapIconRef.current, ...myAnimationsRotate360);
  }

  function swapToTyping() {
    if (activeMode !== "typing") {
      swapIconAnimation(swapIconRef.current, ...myAnimationsRotate360);
      dispatch(logicActions.changeMode());
    }
  }

  function swapToClicking() {
    if (activeMode !== "clicking") {
      swapIconAnimation(swapIconRef.current, ...myAnimationsRotate360);
      dispatch(logicActions.changeMode());
    }
  }

  return (
    <div className={classes.mainLearningMode}>
      <div>
        <p className="primary">Learning mode</p>
      </div>
      <div>
        <motion.button
          onClick={swapToTyping}
          className={
            activeMode === "typing"
              ? `${classes.active} ${classes.btn}`
              : `${classes["not-active"]} ${classes.btn}`
          }>
          Typing
        </motion.button>
        <button>
          <img
            ref={swapIconRef}
            src={swapIcon}
            alt="swap"
            style={w < 768 ? { height: "20px" } : {}}
            onClick={onSwapHandler}
          />
        </button>
        <motion.button
          className={
            activeMode === "clicking" ? classes.active : classes["not-active"]
          }
          onClick={swapToClicking}>
          Clicking
        </motion.button>
      </div>
    </div>
  );
};

export default LearningMode;
