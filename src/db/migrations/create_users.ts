import { Knex } from "knex";
import { EnumUsersRole } from "../../types/db.types";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.CreateTableBuilder) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("description");
    table
      .enu(
        "role",
        Object.values(EnumUsersRole).filter(
          (value) => typeof value === "number",
        ),
      )
      .defaultTo(EnumUsersRole.USER);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
