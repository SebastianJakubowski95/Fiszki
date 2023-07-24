import classes from "./DeleteModal.module.css";
import WrapperCard from "../../WrapperCard";
import ClickingBar from "../ClickingBar";
import { logicActions } from "../../../store/logic-slice";
import { dataActions } from "../../../store/data-slice";
import { workingDataActions } from "../../../store/workingData-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

const DeleteModal = () => {
  const logic = useSelector((state: RootState) => state.logic);
  const workingData = useSelector((state: RootState) => state.workingData);
  const dispatch = useDispatch();

  function onDelete() {
    const idToDelete = logic.idToDelete.id;
    const kind = logic.idToDelete.kind;
    if (kind === "listHeader") {
      dispatch(logicActions.setPage("listPage"));
    }
    dispatch(dataActions.idToDelete(idToDelete)); // ?
    dispatch(workingDataActions.removeWords(workingData.words2delete));
    dispatch(logicActions.hideDeleteModal());
  }

  function onAbort() {
    dispatch(logicActions.hideDeleteModal());
  }

  return (
    <div className={classes.mainDeleteModal}>
      <WrapperCard isCloseVisible={false} title="Delete">
        <ClickingBar onGreen={onDelete} onRed={onAbort} type="warning" />
      </WrapperCard>
    </div>
  );
};

export default DeleteModal;
