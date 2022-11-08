import React from "react";
import classes from "./UserInput.module.css";
const UserInput = (props, ref) => {
  return (
    <div className={classes.control}>
      <label htmlFor={props.name}>{props.name}</label>
      <input
        // ref={ref}
        onChange={props.onChange}
        type={props.type}
        id={props.id}
        className={`${props.className}`}
      ></input>
    </div>
  );
};
export default UserInput;
