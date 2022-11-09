import React, { useState } from "react";
import UserInput from "./UserInput";
import classes from "./AddMovies.module.css";
const AddMovies = (props) => {
  const [enteredTitle, setenteredTitle] = useState("");
  const [enteredText, setenteredText] = useState("");
  const [enteredDate, setenteredDate] = useState("");
  //   const titleref = useRef(null);
  //   const openingref = useRef(null);
  //   const dateref = useRef(null);
  const fromHandler = (event) => {
    event.preventDefault();
    const obj = {
      title: enteredTitle,
      openiningText: enteredText,
      date: enteredDate,
    };
    props.onaddmovieHandler(obj);
    //console.log(obj);
  };
  const titleChangeHandler = (event) => {
    // console.log(event.target.value);
    setenteredTitle(event.target.value);
  };
  const textChangeHandler = (event) => {
    // console.log(event.target.value);
    setenteredText(event.target.value);
  };
  const dateChangeHandler = (event) => {
    //console.log(event.target.value);
    setenteredDate(event.target.value);
  };
  return (
    <div>
      <form onSubmit={fromHandler}>
        <UserInput
          //   ref={titleref}
          id="title"
          name="Title"
          type="text"
          onChange={titleChangeHandler}
          className={classes.title}
        ></UserInput>
        <div className={classes.txt}>
          <label>Opening Text</label>
          <textarea
            name="Opening Text"
            type="text"
            onChange={textChangeHandler}
            // ref={openingref}
            id="openingtext"
          />
        </div>
        <UserInput
          //   ref={dateref}
          id="ReleaseDate"
          name="Release Date"
          type="text"
          onChange={dateChangeHandler}
          className={classes.release}
        ></UserInput>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddMovies;
