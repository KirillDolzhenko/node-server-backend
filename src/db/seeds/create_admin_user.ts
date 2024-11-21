import { Knex } from "knex";
import bcrypt from "bcrypt";
import { EnumUsersRole } from "../../types/db.types";
import { IUser } from "../database";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  const salt = bcrypt.genSaltSync();

  const users = [
    {
      id: 1,
      email: "admin@admin.com",
      password: "passwordAdmin",
      role: EnumUsersRole.ADMIN + 1,
    },
    {
      id: 2,
      email: "user@user.com",
      password: "password",
      role: EnumUsersRole.USER + 1,
    },
  ];

  //   const usersData = await users.map(async (el) => ({
  //     ...el,
  //     password: await bcrypt.hash(el.password, salt),
  //   }));

  const usersData = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, salt),
    }))
  );

  await knex("users").insert(usersData);

  console.log("======== CREATED USERS ========");
  console.table(
    users.map((el) => ({
      ...el,
      role: el.role - 1 === EnumUsersRole.ADMIN ? "ADMIN" : "USER",
    }))
  );
}
