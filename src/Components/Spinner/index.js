import React from "react";
import classes from "./spinner.module.css";

const Spinner = (props) => {
  return <div className={classes.spinner} style={props.style}></div>;
};

export default Spinner;