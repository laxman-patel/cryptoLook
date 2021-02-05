import cron from "node-cron";
import { saveCoinsToRedis } from "./redisQueries.js";
import { getCoinsWithPrice } from "./apiRequests.js";

const cronJobFunc = async () => {
  const data = await getCoinsWithPrice(500);
  saveCoinsToRedis(data);
};

export const cronJob = () => {
  cronJobFunc();
  cron.schedule("*/10 * * * *", cronJobFunc);
};
