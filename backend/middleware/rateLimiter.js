import rateLimiter from "express-rate-limiter";
const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
export default limiter;
