import { redis as redisClient } from "./redis.js";

export const saveCoinsToRedis = async data => {
  data.forEach(coin => {
    const jsonCoin = JSON.stringify(coin);

    redisClient.set(coin.symbol, jsonCoin);
  });
};

export const getCoinFromRedis = async coin => {
  let data = await redisClient.get(coin);

  data = JSON.parse(data);

  return data;
};

export const getAllCoinSymbolsFromRedis = async () => {
  const coinSymbols = await redisClient.keys("*");

  return coinSymbols;
};

export const getAllCoinsFromRedis = async () => {
  const coins = [];

  const coinSymbols = await getAllCoinSymbolsFromRedis();

  for (let i = 0; i < coinSymbols.length; i++) {
    const symbol = coinSymbols[i];
    const coin = await getCoinFromRedis(symbol);

    coins.push(coin);
  }

  return coins;
};
