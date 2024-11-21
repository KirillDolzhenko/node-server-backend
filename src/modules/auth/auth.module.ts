import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

export const AuthModule = new AuthController(new AuthService());
