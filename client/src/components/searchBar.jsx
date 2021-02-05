import React from "react";
import { createUseStyles } from "react-jss";

export default function SearchBar({ currentSearch, setCurrentSearch }) {
  const classes = useStyles();

  return (
    <div>
      <input
        className={classes.searchBox}
        value={currentSearch}
        type="search"
        placeholder="Search...           🔍"
        onChange={e => setCurrentSearch(e.target.value)}
      />
    </div>
  );
}

const useStyles = createUseStyles({
  searchBox: {
    height: "2.4em",
    width: "10em",
    border: "1.4px solid rgba(0,0,0,0.25)",
    borderRadius: "3px",
    padding: "0 0 0 0.8em",
    marginRight: "2em",
    fontFamily: "Poppins",
  },
});
