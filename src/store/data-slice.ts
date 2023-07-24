import { createSlice } from "@reduxjs/toolkit";
import { dataItem } from "../models/dataItem";

const initial: dataItem[] = [];
// {
//   listId: Math.random(),
//   listTitle: "List 1",
//   isListChecked: false,
//   wordsList: [
//     {
//       wordId: Math.random(),
//       polish: "kot",
//       english: "cat",
//     },
//   ],
// },
const exampleData: dataItem[] = [
  {
    listId: Math.random(),
    listTitle: "list 050723",
    isListChecked: false,
    wordsList: [
      {
        wordId: Math.random(),
        polish: "nachylenie",
        english: "slope",
      },
      {
        wordId: Math.random(),
        polish: "nakładać",
        english: "superimpose",
      },
      {
        wordId: Math.random(),
        polish: "przecinać",
        english: "intersect",
      },
      {
        wordId: Math.random(),
        polish: "rozbieżność",
        english: "divergence",
      },
      {
        wordId: Math.random(),
        polish: "prostokąt",
        english: "rectangle",
      },
      {
        wordId: Math.random(),
        polish: "zakres",
        english: "span",
      },
      {
        wordId: Math.random(),
        polish: "wielkość",
        english: "magnitude",
      },
      {
        wordId: Math.random(),
        polish: "obwód",
        english: "perimeter",
      },
      {
        wordId: Math.random(),
        polish: "niezmienny",
        english: "immutable",
      },
      {
        wordId: Math.random(),
        polish: "współczynnik",
        english: "coefficient",
      },
      {
        wordId: Math.random(),
        polish: "wykres",
        english: "chart",
      },
      {
        wordId: Math.random(),
        polish: "rozpraszać",
        english: "scatter",
      },
      {
        wordId: Math.random(),
        polish: "kreślić",
        english: "plot",
      },
      {
        wordId: Math.random(),
        polish: "trafny",
        english: "pertinent",
      },
      {
        wordId: Math.random(),
        polish: "niejawne",
        english: "implicit",
      },
      {
        wordId: Math.random(),
        polish: "jawne",
        english: "explicit",
      },
      {
        wordId: Math.random(),
        polish: "włączać",
        english: "incorporate",
      },
      {
        wordId: Math.random(),
        polish: "oszacować",
        english: "estimate",
      },
      {
        wordId: Math.random(),
        polish: "oceniać",
        english: "evaluate",
      },
      {
        wordId: Math.random(),
        polish: "oszacować",
        english: "evaluate",
      },
      {
        wordId: Math.random(),
        polish: "pochodzenie",
        english: "descent",
      },
      {
        wordId: Math.random(),
        polish: "zejście",
        english: "descent",
      },
      {
        wordId: Math.random(),
        polish: "zmieniać się",
        english: "vary",
      },
    ],
  },
  {
    listId: Math.random(),
    listTitle: "list 100723",
    isListChecked: false,
    wordsList: [
      {
        wordId: Math.random(),
        polish: "odnieść się",
        english: "relate",
      },
      {
        wordId: Math.random(),
        polish: "obdarowany",
        english: "endowed",
      },
      {
        wordId: Math.random(),
        polish: "odrębny",
        english: "distinct",
      },
      {
        wordId: Math.random(),
        polish: "wyraźny",
        english: "distinct",
      },
      {
        wordId: Math.random(),
        polish: "ujawnić",
        english: "reveal",
      },
      {
        wordId: Math.random(),
        polish: "posiadać",
        english: "possess",
      },
      {
        wordId: Math.random(),
        polish: "namacalny",
        english: "tangible",
      },
    ],
  },
];

initial.push(...exampleData);
interface AddWordAction {
  type: string;
  payload: {
    listId: number;
    wordsPair: object;
  };
}

const dataSlice = createSlice({
  name: "data",
  initialState: initial,
  reducers: {
    addList(state, action) {
      return [action.payload, ...state];
    },
    renameList(state, action) {
      const { listId, newTitle } = action.payload;
      const listIndex = state.findIndex((list) => list.listId === listId);
      const list = state[listIndex];
      list.listTitle = newTitle;
    },

    idToDelete(state, action) {
      const idToDelete = action.payload;
      for (let i = 0; i < state.length; i++) {
        if (state[i].listId === idToDelete) {
          console.log("removed list: ", state[i].listId, idToDelete);
          state.splice(i, 1);
          break;
        }
        for (let j = 0; j < state[i].wordsList.length; j++) {
          if (state[i].wordsList[j].wordId === idToDelete) {
            console.log(
              "removed word: ",
              state[i].wordsList[j].wordId,
              idToDelete
            );
            state[i].wordsList.splice(j, 1);
            break;
          }
        }
      }
    },

    addWord(state: any, action: AddWordAction) {
      const listIndex = state.findIndex(
        (list: any) => list.listId === action.payload.listId
      );
      if (listIndex !== -1) {
        // for (let i = 0; i < state[listIndex].wordsList.length; i++) {
        //   //   if(state[listIndex].wordsList[i].polish===action.payload.wordsPair.)
        // }
        state[listIndex].wordsList = [
          action.payload.wordsPair,
          ...state[listIndex].wordsList,
        ];
      }
    },

    updateWord(state, action) {
      const { listId, wordId, updatedWordsPair } = action.payload;
      const list = state.filter((list) => list.listId === listId)[0];
      const wordIndex = list.wordsList.findIndex(
        (word) => word.wordId === wordId
      );
      list.wordsList.splice(wordIndex, 1, updatedWordsPair);
      console.log("ok2");
    },

    deleteWord(state, action) {
      const { listId, wordId } = action.payload;
      const listIndex = state.findIndex((list) => list.listId === listId);
      if (listIndex !== -1) {
        const updatedList = state[listIndex].wordsList.filter(
          (word) => word.wordId !== wordId
        );
        state[listIndex].wordsList = updatedList;
      }
    },

    checkList(state, action) {
      const listIndex = state.findIndex(
        (list) => list.listId === action.payload
      );
      if (listIndex !== -1) {
        if (state[listIndex].isListChecked === false) {
          state[listIndex].isListChecked = true;
        } else if (state[listIndex].isListChecked === true) {
          state[listIndex].isListChecked = false;
        }
      } else {
        console.log(action.payload);
      }
    },
    unCheckList(state, action) {
      const index = state.findIndex(
        (list) => list.listId === action.payload.listId
      );
      state[index].isListChecked = false;
    },
    resetSelectedLists(state) {
      state.forEach((list) => (list.isListChecked = false));
    },
  },
});

export default dataSlice.reducer;
export const dataActions = dataSlice.actions;
