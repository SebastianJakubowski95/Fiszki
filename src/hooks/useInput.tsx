import { useState } from "react";

const useInput = (word: string, isTouched: boolean) => {
  const [isValid, setIsValid] = useState(word.length > 1 && !isTouched);
  setIsValid(word.length > 1);

  return { isValid };
};
export default useInput;
