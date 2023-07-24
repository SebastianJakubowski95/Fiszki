import classes from "./WordSettingsModal.module.css";
import React, { useState, useEffect } from "react";
import WrapperCard from "../../WrapperCard";
import Button from "../../Button";
import DataInput from "../../DataInput";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../../../store/data-slice";
import { RootState } from "../../../store";
import { logicActions } from "../../../store/logic-slice";

const WordSettingsModal = () => {
  const data = useSelector((state: RootState) => state.data);
  const logic = useSelector((state: RootState) => state.logic);
  const wordId = logic.currentWordId;
  const listId = logic.currentListId;
  const list = data.filter((list) => list.listId === logic.currentListId)[0];
  const wordsPair = list.wordsList.filter(
    (wordsPair) => wordsPair.wordId === wordId
  )[0];
  const firstLanguage = wordsPair.polish;
  const secondLanguage = wordsPair.english;
  const [newValues, setNewValues] = useState({
    firstInput: firstLanguage,
    secondInput: secondLanguage,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const list = data.filter((list) => list.listId === logic.currentListId)[0];
    const wordsPair = list.wordsList.filter(
      (wordsPair) => wordsPair.wordId === wordId
    )[0];
    const firstLanguage = wordsPair.polish;
    const secondLanguage = wordsPair.english;
    setNewValues({
      firstInput: firstLanguage,
      secondInput: secondLanguage,
    });
  }, [logic.currentWordId]);

  function onFirstInputChange(value: any) {
    setNewValues({
      firstInput: value,
      secondInput: newValues.secondInput,
    });
  }

  function onSecondInputChange(value: any) {
    setNewValues({
      firstInput: newValues.firstInput,
      secondInput: value,
    });
  }

  function onWordPairUpdate(event: React.FormEvent) {
    event.preventDefault();
    if (newValues.firstInput.length > 0 && newValues.secondInput.length > 0) {
      const updatedWordsPair = {
        wordId: wordId,
        polish: newValues.firstInput,
        english: newValues.secondInput,
      };
      dispatch(dataActions.updateWord({ listId, wordId, updatedWordsPair }));
      dispatch(logicActions.hideWordSettingsModal());
    }
  }

  return (
    <WrapperCard
      title="Word settings"
      isCloseVisible={true}
      onClose={() => dispatch(logicActions.hideWordSettingsModal())}>
      <form onSubmit={onWordPairUpdate} className={classes.mainForm}>
        <DataInput
          header="Polish"
          value={newValues.firstInput}
          onInputChange={onFirstInputChange}
        />
        <DataInput
          header="English"
          value={newValues.secondInput}
          onInputChange={onSecondInputChange}
        />
        <Button type="default" onClick={() => {}} action="submit">
          Confirm
        </Button>
      </form>
    </WrapperCard>
  );
};

export default WordSettingsModal;
