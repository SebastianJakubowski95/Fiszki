import { workingDataActions } from "../store/workingData-slice";
import { useDispatch } from "react-redux";

export const useKnownWord = (currentCard: any) => {
  const dispatch = useDispatch();
  dispatch(workingDataActions.guessedWord(currentCard));

  return <></>;
};
