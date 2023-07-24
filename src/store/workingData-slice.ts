import { createSlice } from "@reduxjs/toolkit";
import { dataItem, WordsPair } from "../models/dataItem";

interface workingState {
  selectedLists: number;
  lists: dataItem[];
  listTitle: string;
  totalWords: WordsPair[];
  numOfAllWords: number;
  guessedWords: WordsPair[];
  words2delete: WordsPair[];
  currentCard: WordsPair | null;
}
const initial: workingState = {
  selectedLists: 0,
  lists: [],
  listTitle: "Add some lists to learn from!",
  totalWords: [],
  numOfAllWords: 0,
  guessedWords: [],
  words2delete: [],
  currentCard: null,
};

const workingDataSlice = createSlice({
  name: "workingData",
  initialState: initial,
  reducers: {
    addList(state, action) {
      state.lists.push(action.payload);
      state.selectedLists += 1;
    },
    removeList(state, action) {
      const index = state.lists.findIndex(
        (item) => item.listId === action.payload.listId
      );
      state.selectedLists -= 1;
      if (index !== -1) {
        state.lists.splice(index, 1);
      }
    },
    setListTitle(state, action) {
      state.listTitle = action.payload;
    },
    resetListTitle(state) {
      state.listTitle = "Add some lists to learn from!";
    },
    resetGuessedWords(state) {
      state.guessedWords = [];
    },

    addWords(state, action) {
      state.totalWords = [...state.totalWords, ...action.payload];
    },
    removeWords(state, action) {
      const listOfWords = action.payload;
      for (let i = 0; i < listOfWords.length; i++) {
        const id2delete = listOfWords[i].wordId;
        state.totalWords = state.totalWords.filter(
          (word) => word.wordId !== id2delete
        );
      }
    },
    resetWords(state) {
      const newTotalWords: any = [];
      state.lists.forEach((list) => {
        for (let i = 0; i < list.wordsList.length; i++) {
          newTotalWords.push(list.wordsList[i]);
        }
      });

      return {
        ...state,
        totalWords: newTotalWords,
        guessedWords: [],
      };
    },

    setWords2delete(state, action) {
      state.words2delete = action.payload;
    },

    addSingleWord(state, action) {
      state.totalWords = [action.payload, ...state.totalWords];
    },

    setNumOfAllWords(state) {
      state.numOfAllWords = state.totalWords.length;
      console.log("state.totalWords.length: ", state.totalWords.length);
    },
    resetSelectedLists(state) {
      state.selectedLists = 0;
      state.listTitle = "";
      state.totalWords = [];
      state.guessedWords = [];
      state.lists = [];
    },
    guessedWord(state, action) {
      state.guessedWords = [...state.guessedWords, action.payload];
      const idToRemove = action.payload.wordId;
      const removeIndex = state.totalWords.findIndex(
        (word) => word.wordId === idToRemove
      );
      state.totalWords.splice(removeIndex, 1);
    },
    skipWord(state) {
      if (state.totalWords.length > 1) {
        const [skippedWord] = state.totalWords.splice(0, 1);
        const newArr = [...state.totalWords, skippedWord];
        state.totalWords = newArr;
        state.currentCard = newArr[0];
      }
    },
    shuffleWords(state) {
      for (let i = state.totalWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.totalWords[i], state.totalWords[j]] = [
          state.totalWords[j],
          state.totalWords[i],
        ];
      }
      state.currentCard = state.totalWords[0];
    },
    setCurrentCard(state, action) {
      state.currentCard = action.payload;
    },
  },
});

export default workingDataSlice.reducer;
export const workingDataActions = workingDataSlice.actions;
