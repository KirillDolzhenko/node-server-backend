import http from "http";
import { TAuth } from "../../../validations/auth.validation";
import db, { IUser, IUserOptional } from "../../database";
import { EnumUsersRole } from "../../../types/db.types";

export async function dbInsertAndGetUser(data: TAuth): Promise<IUser | null> {
  try {
    let id = (
      await db("users").insert({
        ...data,
        // ,
        // role: EnumUsersRole.USER,
      })
    )[0];
    let user = (await db("users").where({ id }))[0];

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function dbGetUserByEmail(email: string): Promise<IUser | null> {
  try {
    let user: IUser = (
      await db("users").where({
        email,
      })
    )[0];

    console.log(user);

    return user;
  } catch (error) {
    return null;
  }
}

export async function dbGetUserById(id: number): Promise<IUser | null> {
  try {
    let user: IUser = (
      await db("users").where({
        id,
      })
    )[0];

    console.log(user);

    return user;
  } catch (error) {
    return null;
  }
}

export async function dbUpdateUserById(
  id: number,
  data: IUserOptional
): Promise<IUser | null> {
  try {
    let user: IUser = (
      await db("users").where({
        id,
      })
    )[0];

    if (!user) {
      throw "Invalid data";
    }
    console.log(data);

    if (Object.keys(data).length) {
      let userStatus = await db("users")
        .where({
          id,
        })
        .update(data);

      if (!userStatus) {
        throw "Error occured";
      }
    }

    let userUpdated: IUser = (
      await db("users").where({
        id,
      })
    )[0];

    if (!userUpdated) {
      throw "Error occured";
    }

    return userUpdated;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function dbIsAdminUserById(id: number): Promise<Boolean | null> {
  try {
    const user = await dbGetUserById(id);

    if (!user) {
      throw "Error occured";
    }

    return Number(user.role) === EnumUsersRole.ADMIN;
  } catch (error) {
    console.log(error);

    return null;
  }
}
