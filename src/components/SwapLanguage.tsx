import classes from "./SwapLanguage.module.css";
import { useAnimate, motion } from "framer-motion";
import { myAnimations02, myAnimationsRotate360 } from "../animations/animation";
import swapIcon from "../assets/swap.svg";
import { useDispatch } from "react-redux";
import { logicActions } from "../store/logic-slice";

const SwapLanguage: React.FC<{ onSwapHandler: () => void }> = (props) => {
  let w = window.innerWidth;
  const [mainSwapLanguageRef, mainSwapLanguageAnimation] = useAnimate();
  const [swapIconRef, swapIconAnimation] = useAnimate();
  const dispatch = useDispatch();

  function onClickHandler() {
    mainSwapLanguageAnimation(mainSwapLanguageRef.current, ...myAnimations02);
    swapIconAnimation(swapIconRef.current, ...myAnimationsRotate360);
    dispatch(logicActions.changeLanguage());
    props.onSwapHandler();
  }

  return (
    <motion.button
      ref={mainSwapLanguageRef}
      className={classes.mainSwapLanguage}
      onClick={onClickHandler}>
      <p>Swap languages</p>
      <motion.img
        ref={swapIconRef}
        src={swapIcon}
        alt="swap language"
        style={w < 768 ? { height: "20px" } : {}}
      />
    </motion.button>
  );
};

export default SwapLanguage;
