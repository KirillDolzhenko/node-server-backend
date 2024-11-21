import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

export const UsersModule = new UsersController(new UsersService());