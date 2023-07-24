import classes from "./Checkbox.module.css";
import React from "react";
import { dataItem } from "../models/dataItem";

const Checkbox: React.FC<{ listData?: dataItem }> = (props) => {
  return (
    <div className={classes.mainCheckbox}>
      <input type="checkbox" style={{ display: "none" }} />
      {props.listData?.isListChecked && <div className={classes.checked} />}
    </div>
  );
};

export default Checkbox;
