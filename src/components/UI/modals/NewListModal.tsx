import classes from "./NewListModal.module.css";
import React, { useState } from "react";
import WrapperCard from "../../WrapperCard";
import Button from "../../Button";
import DataInput from "../../DataInput";
import { useDispatch } from "react-redux";
import { dataActions } from "../../../store/data-slice";
import { logicActions } from "../../../store/logic-slice";

const NewListModal = () => {
  const initialList = {
    listId: Math.random(),
    listTitle: "",
    isListChecked: false,
    wordsList: [],
  };

  const [newList, setNewList] = useState(initialList);
  const dispatch = useDispatch();

  function createNewListHandler(value: string) {
    const obj = {
      listId: Math.random(),
      listTitle: value,
      isListChecked: false,
      wordsList: [],
    };
    setNewList(obj);
  }

  function onFormSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (newList.listTitle.trim().length > 0) {
      dispatch(dataActions.addList(newList));
      dispatch(logicActions.hideNewListModal());
    }
  }

  return (
    <>
      <WrapperCard
        isCloseVisible={true}
        title={newList.listTitle === "" ? "Add new list" : newList.listTitle}
        onClose={() => dispatch(logicActions.hideNewListModal())}>
        <form onSubmit={onFormSubmitHandler} className={classes.mainForm}>
          <div>
            <DataInput
              header="List Name"
              onInputChange={createNewListHandler}
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

export default NewListModal;
