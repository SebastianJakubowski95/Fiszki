import classes from "./RenameListModal.module.css";
import React, { useState } from "react";
import WrapperCard from "../../WrapperCard";
import Button from "../../Button";
import DataInput from "../../DataInput";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../../../store/data-slice";
import { RootState } from "../../../store";
import { logicActions } from "../../../store/logic-slice";

const RenameListModal = () => {
  const state = useSelector((state: RootState) => state);

  const listIndex = state.data.findIndex(
    (list) => list.listId === state.logic.currentListId
  );
  const list = state.data[listIndex];
  const initialTitle = list.listTitle;
  const [newTitle, setNewTitle] = useState(initialTitle);
  const dispatch = useDispatch();

  function onFormSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (newTitle.trim().length > 0) {
      dispatch(
        dataActions.renameList({ listId: state.logic.currentListId, newTitle })
      );
      dispatch(logicActions.hideRenameListModal());
    }
  }

  return (
    <>
      <WrapperCard
        isCloseVisible={true}
        title={newTitle}
        onClose={() => dispatch(logicActions.hideRenameListModal())}>
        <form onSubmit={onFormSubmitHandler} className={classes.mainForm}>
          <div>
            <DataInput
              header="List Name"
              onInputChange={(value: string) => setNewTitle(value)}
              value={newTitle}
            />
          </div>
          <Button action="submit" type="default">
            Confirm
          </Button>
        </form>
      </WrapperCard>
    </>
  );
};

export default RenameListModal;
