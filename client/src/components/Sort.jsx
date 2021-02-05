import React from "react";
import Dropdown from "react-dropdown";
import { createUseStyles } from "react-jss";
import "react-dropdown/style.css";

export default function Sort({ sortBy, setSortBy, sortTypes }) {
  const options = [sortTypes.RANK, sortTypes.PRICE, sortTypes.GAIN];

  const onSelect = data => {
    const selection = data.value;

    setSortBy(selection);
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <label className={classes.label}>sort:</label>
      <Dropdown
        className={classes.menu}
        options={options}
        onChange={onSelect}
        value={options[0]}
      />
    </div>
  );
}

const useStyles = createUseStyles({
  container: {
    width: "5em",
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: "1.2em",
    opacity: "0.8",
  },
  menu: {
    marginLeft: "0.5em",
  },
});
