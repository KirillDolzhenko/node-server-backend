import { Knex } from "knex";
import config from "./src/config";

const configKnex: Knex.Config = {
  client: "mysql",
  connection: {
    host: config.database.hostname,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.title,
  },
  migrations: {
    directory: "./src/db/migrations",
    extension: "ts",
  },
  seeds: {
    directory: "./src/db/seeds",
  },
};

export default configKnex;
