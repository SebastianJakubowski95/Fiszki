import { createSlice } from "@reduxjs/toolkit";

const initial = {
  learningMode: "clicking",
  language: "w1",
  currentListId: null,
  currentWordId: null,
  currentPage: "learnPage",
  showWordSettingsModal: false,
  showNewWordModal: false,
  showDeleteModal: false,
  showNewListModal: false,
  showRenameListModal: false,
  idToDelete: {
    id: null,
    kind: "",
  },
};

const logicSlice = createSlice({
  name: "logic",
  initialState: initial,
  reducers: {
    changeMode(state) {
      if (state.learningMode === "clicking") {
        state.learningMode = "typing";
      } else if (state.learningMode === "typing") {
        state.learningMode = "clicking";
      }
    },
    changeLanguage(state) {
      if ((state.language = "w1")) {
        state.language = "w2";
      } else if ((state.language = "w2")) {
        state.language = "w1";
      }
    },
    setListId(state, action) {
      state.currentListId = action.payload;
    },
    resetListId(state) {
      state.currentListId = null;
    },
    setWordId(state, action) {
      state.currentWordId = action.payload;
    },
    resetWordId(state) {
      state.currentWordId = null;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    showWordSettingsModal(state) {
      state.showWordSettingsModal = true;
    },
    hideWordSettingsModal(state) {
      state.showWordSettingsModal = false;
    },
    showNewWordModal(state) {
      state.showNewWordModal = true;
    },
    hideNewWordModal(state) {
      state.showNewWordModal = false;
    },
    showDeleteModal(state) {
      state.showDeleteModal = true;
    },
    hideDeleteModal(state) {
      state.showDeleteModal = false;
    },
    setIdToDelete(state, action) {
      const { id, kind } = action.payload;
      state.idToDelete = {
        id: id,
        kind: kind,
      };
      console.log(action.payload);
    },

    showNewListModal(state) {
      state.showNewListModal = true;
    },
    hideNewListModal(state) {
      state.showNewListModal = false;
    },
    showRenameListModal(state) {
      state.showRenameListModal = true;
    },
    hideRenameListModal(state) {
      state.showRenameListModal = false;
    },
  },
});

export default logicSlice.reducer;
export const logicActions = logicSlice.actions;
