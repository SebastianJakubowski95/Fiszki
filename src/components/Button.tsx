import React from "react";
import classNames from "classnames";
import classes from "./Button.module.css";
import plusLgIcon from "../assets/plus2.svg";
import plusSmallIcon from "../assets/plus.svg";
import { motion } from "framer-motion";
import { useAnimate } from "framer-motion";
import { easeOut } from "framer-motion/dom";

const Button: React.FC<{
  type: string;
  children: any;
  onClick?: () => void;
  action?: string;
}> = (props) => {
  const [scope, animate] = useAnimate();

  let w = window.innerWidth;
  let btnClass;

  switch (props.type) {
    case "addNew":
      btnClass = classes.addNew;
      break;
    case "default":
      btnClass = classes.default;
      break;
    case "login":
      btnClass = classes.login;
      break;
    case "resetWords":
      btnClass = classes.resetWords;
      break;
  }

  function onClickHandler() {
    animate(
      scope.current,
      { scale: [1, 0.95, 1] },
      { duration: 0.2, ease: easeOut }
    );
    setTimeout(() => {
      props.onClick ? props.onClick!() : () => {};
    }, 200);
  }

  return (
    <motion.button
      type={props.action === "submit" ? "submit" : "button"}
      ref={scope}
      onClick={onClickHandler}
      className={classNames(
        classes.btn,
        btnClass,
        props.children === "Skip" && classes.skip,
        props.children === "CLEAR SELECTED" && classes["clear-selected"]
      )}>
      {props.type === "addNew" && (
        <img src={w > 768 ? plusLgIcon : plusSmallIcon} alt="img" />
      )}
      {props.children}
    </motion.button>
  );
};

export default Button;
