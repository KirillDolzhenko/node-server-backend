import * as dotenv from "dotenv";

dotenv.config();

interface IConfig {
  cors: string;
  knex: string;
  server: {
    hostname: string;
    port: number;
  };
  jwt: {
    secret: string;
  };
  database: {
    user: string;
    password: string;
    hostname: string;
    port: number;
    title: string;
  };
}

const config: IConfig = {
  cors: process.env.CORS_URL || "",
  knex: process.env.KNEX_CLIENT || "mysql",
  server: {
    hostname: process.env.SERVER_HOSTNAME || "localhost",
    port: Number(process.env.SERVER_PORT) || 3000,
  },
  jwt: {
    secret: String(process.env.JWT_SECRET),
  },
  database: {
    user: String(process.env.DATABASE_USER),
    password: String(process.env.DATABASE_PASSWORD),
    hostname: process.env.DATABASE_HOSTNAME || "localhost",
    port: Number(process.env.DATABASE_PORT),
    title: String(process.env.DATABASE_DATABASE),
  },
};

export default config;
