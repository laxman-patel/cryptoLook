import axios from "axios";
import dotEnv from "dotenv";

const CRYPTO_API_URI = `https://pro-api.coinmarketcap.com/v1/cryptocurrency`;

dotEnv.config();

export const getCoinsWithPrice = async numCoin => {
  const result = [];

  const response = await axios
    .get(`${CRYPTO_API_URI}/listings/latest`, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CRYPTO_KEY,
      },
      params: {
        start: "1",
        limit: `${numCoin}`,
        convert: "USD",
      },
    })
    .catch(e => console.log(e));

  const data = response.data.data;

  data.forEach(coin => {
    const { name, symbol, id } = coin;
    const price = Number(coin.quote["USD"].price.toFixed(5));
    const marketCap = coin.quote["USD"].market_cap;
    const change = coin.quote["USD"].percent_change_24h;
    const rank = coin.cmc_rank;
    const icon = `https://s2.coinmarketcap.com/static/img/coins/128x128/${id}.png`;

    const coinObj = {
      id,
      name,
      symbol,
      price,
      marketCap,
      change,
      rank,
      icon,
    };

    result.push(coinObj);
  });

  return result;
};
