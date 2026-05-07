import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  JWT_SECRET: z.string().min(1, "Required"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(`Invalid environment variables:`);
  console.error(result.error.format());
  process.exit(1);
}

const env = result.data;

export default env;
