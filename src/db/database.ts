import knex from "knex";
import { Knex } from "knex";
import config from "../../knexfile";
import { EnumUsersRole } from "../types/db.types";

const configTs = config as Knex.Config;

const db = knex(configTs);

export default db;

export interface IUserEmail {
  email: string;
}

export interface IUser extends IUserEmail {
  id: string;
  username: string;
  role: EnumUsersRole;
  password?: string;
}

export interface IUserOptional {
  username?: string;
  email?: string;
  password?: string;
}
