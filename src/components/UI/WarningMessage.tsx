import classes from "./WarningMessage.module.css";
import WrapperCard from "../WrapperCard";
import ClickingBar from "./ClickingBar";

const WarningMessage = () => {
  return (
    <div className={classes.mainWarningMessage}>
      <WrapperCard isCloseVisible={false} title="Warning">
        <ClickingBar type="warning" onGreen={() => <></>} onRed={() => <></>} />
      </WrapperCard>
    </div>
  );
};

export default WarningMessage;
