import React from "react";
import { createUseStyles } from "react-jss";

const fakeData = [];

for (let i = 0; i < 30; i++) {
  fakeData.push(i);
}

export default function LoadingSkeleton() {
  const classes = useStyles();

  return (
    <div>
      <ul className={classes.cards}>
        {fakeData.map(i => (
          <div key={i} className={classes.card}>
            <p className={classes.loadingText}>Loading...</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

const useStyles = createUseStyles({
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gridGap: "50px",
  },

  card: {
    height: "23em",
    width: "20.4em",
    boxShadow: "0px 20px 40px 0px rgba(0,0,0,0.05)",
    border: "1px solid rgba(0,0,0,0.1)",
    background: "linear-gradient(142deg, #fcfcfc 38%, #F4F4F4 117%)",
    borderRadius: "8px",
    margin: "auto",
    display: "grid",
    placeItems: "center",
  },

  loadingText: {
    fontSize: "2em",
    opacity: "0.1",
    fontWeight: 500,
  },
});
