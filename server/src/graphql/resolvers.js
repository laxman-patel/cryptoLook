import { getAllCoinsFromRedis } from "../lib/redisQueries.js";

const sortByRank = (a, b) => {
  if (a.rank > b.rank) {
    return 1;
  }

  if (a.rank < b.rank) {
    return -1;
  }

  return 0;
};

export const resolvers = {
  Query: {
    hello: () => "world",
    getAllCrypto: async (_parent, { limit = 15, offset = 0 }) => {
      const coins = await getAllCoinsFromRedis();

      const paginatedCoins = coins.sort(sortByRank).slice(offset, limit);

      return paginatedCoins;
    },
  },
};
