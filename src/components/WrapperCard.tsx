import classes from "./WrapperCard.module.css";
import closeIcon from "../assets/close.svg";
import { useAnimate } from "framer-motion";
import { myAnimations01 } from "../animations/animation";
import { createPortal } from "react-dom";

const WrapperCard: React.FC<{
  children: React.ReactNode;
  title: string;
  isCloseVisible: boolean;
  onClose?: () => void;
}> = (props) => {
  const [closeIconRef, closeIconAnimation] = useAnimate();

  function onCloseHandler() {
    closeIconAnimation(closeIconRef.current, ...myAnimations01);
    setTimeout(() => {
      props.onClose!();
    }, 200);
  }

  const modal = (
    <>
      <div className={classes.mainWrapperCard}>
        <div>
          {props.isCloseVisible && (
            <button>
              <img
                ref={closeIconRef}
                onClick={onCloseHandler}
                src={closeIcon}
                alt="close"
              />
            </button>
          )}
          <h2 className={classes.title}>{props.title}</h2>
        </div>
        <div>{props.children}</div>
      </div>
      <div className={classes["bg-modal"]} onClick={onCloseHandler} />
    </>
  );
  const modalRoot = document.getElementById("modal");
  if (modalRoot) {
    return createPortal(modal, modalRoot);
  } else {
    return null;
  }
};

export default WrapperCard;
