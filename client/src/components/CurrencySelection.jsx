import React from "react";
import Dropdown from "react-dropdown";
import { createUseStyles } from "react-jss";
import "react-dropdown/style.css";

const options = ["USD", "INR", "GBP", "EUR"];

export default function CurrencySelection({ setCurrentCurrency }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <label className={classes.label}>currency:</label>
      <Dropdown
        className={classes.menu}
        options={options}
        onChange={data => setCurrentCurrency(data.value)}
        value={options[0]}
      />
    </div>
  );
}

const useStyles = createUseStyles({
  container: {
    display: "flex",
    alignItems: "center",
  },
  menu: {
    marginLeft: "0.5em",
  },
});
