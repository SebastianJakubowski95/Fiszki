import classes from "./DataInput.module.css";
import classNames from "classnames";
import { useState, useEffect } from "react";

const DataInput: React.FC<{
  header: string;
  value?: string;
  onInputChange: (value: string) => void;
}> = (props) => {
  const [value, setValue] = useState(props.value ? props.value : "");
  const [isFocus, setIsFocus] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(value.length > 0);

  function onFocus() {
    setIsFocus(true);
    setIsTouched(true);
  }

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setValue(newValue);
    setIsValid(newValue.length > 0);
  }

  useEffect(() => {
    if (props.value) {
      if (value !== props.value) {
        props.onInputChange(value);
      }
    } else {
      props.onInputChange(value);
    }
  }, [value]);

  return (
    <div className={classes.mainDataInput}>
      <h2 style={isFocus ? { color: "#df8420" } : {}}>{props.header}:</h2>
      <input
        className={classNames(
          classes.input,
          isTouched && !isValid && classes.inValid
        )}
        onFocus={onFocus}
        onBlur={() => setIsFocus(false)}
        style={isFocus ? { borderColor: "#df8420" } : {}}
        type="text"
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default DataInput;
