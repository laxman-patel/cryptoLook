import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { formatNumber } from "../utils/formatNumber";
import { ReactComponent as GreenArrow } from "../assets/greenArrow.svg";
import { ReactComponent as RedArrow } from "../assets/redArrow.svg";
import { ReactComponent as IconBorder } from "../assets/iconBorder.svg";
import { currencySymbol } from "../utils/currencySymbol";

const iconFallback =
  "https://www.pinclipart.com/picdir/big/112-1122855_clash-royale-coins-png-image-royalty-free-clash.png";

export default function Coin({
  crypto,
  conversionRate,
  currentCurrency,
  isCurrencyLoading,
}) {
  const { rank, name, price, marketCap, change, symbol, icon } = crypto;
  const [isGain, setIsGain] = useState(false);

  useEffect(() => {
    let isChangePositive = Math.sign(change) === 1;

    if (isChangePositive) {
      setIsGain(true);
    }
  }, [change]);

  const classes = useStyles(isGain);

  return (
    <li className={classes.card}>
      <p className={classes.rank}> {rank}</p>

      <section className={classes.topSection}>
        <img
          className={classes.icon}
          src={`${icon}`}
          alt={`${name} icon`}
          onError={e => {
            e.target.onerror = null;
            e.target.src = iconFallback;
          }}
        />

        <div className={classes.iconBorder}>
          <IconBorder />
        </div>

        <section className={classes.innerTopSection}>
          <p className={classes.name}>{name}</p>
          <p className={classes.symbol}>{symbol}</p>
        </section>
      </section>

      <section className={classes.bottomSection}>
        <p className={classes.price}>
          {!isCurrencyLoading
            ? (price * conversionRate).toLocaleString("en-US", {
                style: "currency",
                currency: currentCurrency,
              })
            : "..."}
        </p>

        <section className={classes.innerBottomSection}>
          <p className={classes.marketCap}>
            {currencySymbol(currentCurrency)}
            {!isCurrencyLoading
              ? formatNumber(marketCap * conversionRate)
              : "-----"}
          </p>
          <p className={classes.change}>
            <span>{isGain ? <GreenArrow /> : <RedArrow />} </span>
            <span className={classes.changePercent}>
              {Math.abs(change.toFixed(2))}%
            </span>
          </p>
        </section>
      </section>
    </li>
  );
}

const useStyles = createUseStyles({
  card: {
    position: "relative",
    listStyle: "none",
    boxShadow: "0px 20px 40px 0px rgba(0,0,0,0.05)",
    border: "1px solid rgba(0,0,0,0.1)",
    background: "linear-gradient(142deg, #fcfcfc 38%, #F4F4F4 117%)",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "25em",
    minWidth: "20em",
    transition: "box-shadow .2s, transform .2s, background .8s",
    padding: "2em 0em",
    margin: "auto",

    "&:hover": {
      boxShadow: "0px 20px 20px 0px rgba(0,0,0,0.05)",
      transform: "scale(0.97)",
      background: "linear-gradient(142deg, #fcfcfc 50%, #F4F4F4 100%)",
    },
  },

  icon: {
    width: "5em",
    /* filter: `drop-shadow(2px 2px 0 black)
    drop-shadow(-2px 2px 0 black)
    drop-shadow(2px -2px 0 black)
    drop-shadow(-2px -2px 0 black)`, */
  },

  iconBorder: {
    position: "absolute",
    top: "0.9em",
  },

  name: {
    fontSize: "1.8em",
    fontWeight: "300",
  },

  symbol: {
    opacity: "0.5",
    marginTop: "0.3em",
    fontSize: "1.1em",
    fontWeight: 400,
  },

  price: {
    fontSize: "2.3em",
    fontWeight: 500,
  },

  topSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  innerTopSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1em",
  },

  bottomSection: {
    marginTop: "2.3em",
    marginBottom: "0.2em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  innerBottomSection: {
    marginTop: "4em",
    display: "flex",
    fontSize: "1.1em",
    justifyContent: "space-between",
    width: "13em",
    fontWeight: 500,
  },

  change: {
    color: props => (props ? "#46C784" : "#FF0843"),
    display: "flex",
    justifyContent: "space-between",
  },

  changePercent: {
    marginLeft: "0.4em",
  },

  marketCap: {
    color: "rgba(0,0,0,0.8)",
  },

  rank: {
    position: "absolute",
    left: "0.13em",
    top: "0.1em",
    opacity: "0.02",
    fontWeight: "500",
    fontSize: "7em",
  },
});
