export interface WordsPair {
  wordId: number;
  polish: string;
  english: string;
}

export interface dataItem {
  listId: number;
  listTitle: string;
  isListChecked: boolean;
  wordsList: WordsPair[];
}
