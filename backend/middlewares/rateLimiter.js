import {
  rateLimiterIncrementKey,
  rateLimiterSetExpire,
} from "../socketHandler/socketUtils.js";

const MAX_REQUESTS_PER_MINUTE = 10;

const rateLimiter = () => {
  return async (req, res, next) => {
    const ip = req.ip;
    const key = `ratelimit:${ip}`;

    try {
      const count = await rateLimiterIncrementKey(key);
      if (count > MAX_REQUESTS_PER_MINUTE) {
        return res.status(429).send({ message: "Too many requests" });
      } else {
        await rateLimiterSetExpire(key);
      }
      next();
    } catch (err) {
      return res.status(429).send({ message: "Internal Error" });
    }
  };
};

export default rateLimiter;
