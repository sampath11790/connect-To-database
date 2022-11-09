import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  const removeItem = () => {
    console.log(props.id);
    // props.a(props.id);
    console.log(props.deleteing(props.id));
    console.log("remove Item");
  };
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button type="button" onClick={removeItem} className={classes.btn}>
        REMOVE
      </button>
    </li>
  );
};

export default Movie;
