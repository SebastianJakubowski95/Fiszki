import classes from "./InputLearn.module.css";
import Button from "../Button";
import sendIcon from "../../assets/send.svg";
import { useAnimate } from "framer-motion";
import { useState, useRef } from "react";

const InputLearn: React.FC<{
  onEnteredValueCheck: (value: string) => void;
  skipAnswering: () => void;
}> = (props) => {
  const [inputSubmitRef, inputSubmitAnimation] = useAnimate();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function onSubmitHandler(event: React.FormEvent | React.MouseEvent) {
    event.preventDefault();
    inputSubmitAnimation(
      inputSubmitRef.current,
      { x: [0, -10, -10, 10, 0] },
      { duration: 0.3, times: [0, 0.4, 0.8, 0.9, 1] }
    );
    props.onEnteredValueCheck(value);
    inputRef.current?.focus;
    setValue("");
  }

  function skipAnswer() {
    props.skipAnswering();
  }

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.mainInputLearn}>
        <Button type="resetWords" onClick={skipAnswer}>
          Skip
        </Button>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your answer here"
          autoFocus={true}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(event?.target.value)
          }
          className={classes.input}
        />
        <button>
          <img
            className={classes["send-icon"]}
            ref={inputSubmitRef}
            onClick={onSubmitHandler}
            src={sendIcon}
            alt="submit"
          />
        </button>
      </div>
    </form>
  );
};

export default InputLearn;
