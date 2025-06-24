import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

import "dotenv/config";

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(
    2, // 100 requests
    "60 s" // per minute
  ),
});

export default rateLimit;
