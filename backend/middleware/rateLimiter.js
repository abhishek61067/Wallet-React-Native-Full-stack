import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-rate-limit");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again later" });
    }

    next();
  } catch (err) {
    console.log(`Error in rateLimiter middleware: ${err.message}`);
    next(err);
  }
};

export default rateLimiter;
