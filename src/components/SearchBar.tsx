import classes from "./SearchBar.module.css";
import searchIcon from "../assets/search.svg";
import closeIcon from "../assets/close.svg";
import { useState } from "react";
import { useAnimate } from "framer-motion";
import { myAnimations01 } from "../animations/animation";

const SearchBar = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [searchIconRef, searchIconAnimation] = useAnimate();

  function onSearchHandler() {
    searchIconAnimation(searchIconRef.current, ...myAnimations01);
    // search
  }
  function onSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    // search
  }

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function onCloseHandler() {
    // show/hide SearchBar
    setValue("");
  }

  return (
    <form className={classes.mainSearchBar} onSubmit={onSubmitHandler}>
      <input
        type="text"
        value={value}
        onChange={onChangeHandler}
        className={classes.input}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        style={isFocus ? { borderColor: "#df8420" } : {}}
      />
      <div className={classes["actions-div"]}>
        <button className={classes.search}>
          <img
            ref={searchIconRef}
            src={searchIcon}
            alt="search"
            onClick={onSearchHandler}
          />
        </button>
        <button>
          <img src={closeIcon} alt="close" onClick={onCloseHandler} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
