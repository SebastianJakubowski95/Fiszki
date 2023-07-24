import classes from "./NewWordModal.module.css";
import React, { useState } from "react";
import WrapperCard from "../../WrapperCard";
import Button from "../../Button";
import DataInput from "../../DataInput";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../../../store/data-slice";
import { RootState } from "../../../store";
import { logicActions } from "../../../store/logic-slice";
import { workingDataActions } from "../../../store/workingData-slice";

const NewWordModal = () => {
  const [newWordsPair, setNewWordsPair] = useState({
    wordId: Math.random(),
    polish: "",
    english: "",
  });
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const logic = useSelector((state: RootState) => state.logic);

  function onFirstInputChange(value: string) {
    const obj = {
      wordId: newWordsPair.wordId,
      polish: value,
      english: newWordsPair.english,
    };
    setNewWordsPair(obj);
  }
  function onSecondInputChange(value: string) {
    const obj = {
      wordId: newWordsPair.wordId,
      polish: newWordsPair.polish,
      english: value,
    };
    setNewWordsPair(obj);
  }

  function onSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    if (newWordsPair.polish.length > 0 && newWordsPair.english.length > 0) {
      const listId = logic.currentListId;
      dispatch(
        dataActions.addWord({ listId: listId!, wordsPair: newWordsPair })
      );
      const list = data.filter((list) => list.listId === listId)[0];
      if (list.isListChecked) {
        dispatch(workingDataActions.addSingleWord(newWordsPair));
        dispatch(workingDataActions.resetWords());
        dispatch(dataActions.unCheckList(list));
      } else {
      }
      dispatch(logicActions.hideNewWordModal());
    }
  }

  return (
    <>
      <WrapperCard
        isCloseVisible={true}
        onClose={() => dispatch(logicActions.hideNewWordModal())}
        title="Add new word">
        <form className={classes.mainNewWordModal} onSubmit={onSubmitForm}>
          <div>
            <DataInput header="Polish" onInputChange={onFirstInputChange} />
            <DataInput header="English" onInputChange={onSecondInputChange} />
          </div>
          <Button action="submit" type="default">
            Confirm
          </Button>
        </form>
      </WrapperCard>
    </>
  );
};

export default NewWordModal;
