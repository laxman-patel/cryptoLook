import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Coin from "./Coin";
import { createUseStyles } from "react-jss";
import Sort from "./Sort";
import CurrencySelection from "./CurrencySelection";
import SearchBar from "./searchBar";
import LoadingSkeleton from "./loadingSkeleton";

const getAllCoins = gql`
  query getCrypto($limit: Int, $offset: Int) {
    getAllCrypto(limit: $limit, offset: $offset) {
      id
      rank
      symbol
      name
      price
      marketCap
      change
      icon
    }
  }
`;

const sortByRank = (a, b) => {
  if (a.rank > b.rank) {
    return 1;
  }

  if (a.rank < b.rank) {
    return -1;
  }

  return 0;
};

const sortByPrice = (a, b) => {
  if (a.price > b.price) {
    return -1;
  }

  if (a.price < b.price) {
    return 1;
  }

  return 0;
};

const sortByGain = (a, b) => {
  if (a.change > b.change) {
    return -1;
  }

  if (a.change < b.change) {
    return 1;
  }

  return 0;
};

const sortTypes = {
  RANK: "Rank",
  PRICE: "Price",
  GAIN: "Gain",
};



export default function CoinList() {

  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(sortTypes.RANK);
  const [currentCurrency, setCurrentCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(15);
  const { loading, error, data, fetchMore } = useQuery(getAllCoins, {
    variables: {
      offset,
      limit,
    },
  });
  const [scrollPos, setScrollPos] = useState(0);
  const [shouldPaginate, setShouldPaginate] = useState(true)

  const classes = useStyles();

  const scrollListener = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;

    setScrollPos(scrolled);
  };

  const onLoadMore = () => {
    const newOffset = offset + 15;
    const newLimit = limit + 15;

    fetchMore({
      variables: {
        limit: newLimit,
        offset: newOffset,
      },
    });

    setOffset(newOffset);
    setLimit(newLimit);
  };

  useEffect(() => {
    if (scrollPos > 0.9 && shouldPaginate) {
      setShouldPaginate(false)
      onLoadMore();

      setTimeout(() => {
        setShouldPaginate(true)
      },2000)

    }
  }, [scrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
  }, []);

  useEffect(() => {
    if (data && loading === false) {
      const cryptoList = data.getAllCrypto;
      let myData = [...cryptoList];

      if (sortBy === sortTypes.RANK) {
        myData.sort(sortByRank);
      } else if (sortBy === sortTypes.PRICE) {
        myData.sort(sortByPrice);
      } else if (sortBy === sortTypes.GAIN) {
        myData.sort(sortByGain);
      }

      setSortedData(myData);
    }
  }, [data, loading, sortBy, currentSearch]);

  useEffect(() => {
    (async () => {
      setIsCurrencyLoading(true);

      const conversionData = await fetch(
        "https://api.exchangeratesapi.io/latest?base=USD"
      ).then(data => data.json());

      setConversionRate(conversionData.rates[currentCurrency].toFixed(2));

      setIsCurrencyLoading(false);
    })();
  }, [currentCurrency]);

  useEffect(() => {
    if (currentSearch !== " ") {
      if (currentSearch) {
        const filteredData = data.getAllCrypto.filter(coin => {
          const regex = RegExp(`${currentSearch}*`, "gi");

          return regex.test(coin.name) || regex.test(coin.symbol);
        });

        if (filteredData.length === 0) {
          setIsSearchEmpty(true);
        } else {
          setIsSearchEmpty(false);
        }

        setSortedData(filteredData);
      }
    }
  }, [currentSearch, data]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setIsLoadingSkeleton(false);
      }, 0);
    }
  }, [loading]);

  if (error) return <p>ERROR!</p>;

  return (
    <div className={classes.container}>
      <div className={classes.topMenu}>
        <Sort setSortBy={setSortBy} sortTypes={sortTypes} />
        <div className={classes.searchAndCurrency}>
          <SearchBar
            currentSearch={currentSearch}
            setCurrentSearch={setCurrentSearch}
          />
          <CurrencySelection setCurrentCurrency={setCurrentCurrency} />
        </div>
      </div>

      {isLoadingSkeleton && <LoadingSkeleton />}

      {isSearchEmpty && <p className={classes.notFound}>Not Found.</p>}

      {!loading && !isSearchEmpty ? (
        <>
         <ul className={classes.cards}>
          {sortedData.map(crypto => (
            <Coin
              isCurrencyLoading={isCurrencyLoading}
              currentCurrency={currentCurrency}
              conversionRate={conversionRate}
              key={crypto.id}
              crypto={crypto}
              />
              ))}
        </ul>
              <p className={classes.notFound}>Loading...</p>
        </>

      ) : (
        <></>
      )}
    </div>
  );
}

const useStyles = createUseStyles({
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gridGap: "50px",
  },

  container: {
    padding: "6em 5em",
    position: "relative",
  },

  topMenu: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2em",
  },

  searchAndCurrency: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  notFound: {
    fontSize: "3em",
    fontWeight: 500,
    opacity: 0.3,
    marginTop: "2em"
  },
});
