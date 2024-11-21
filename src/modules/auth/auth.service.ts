import { schemaAuth, TAuth } from "./../../validations/auth.validation";
import { IConnectionData } from "../../types/modules/common/responses.types";
import { sendData } from "../../utils/sendResponse";
import {
  dbGetUserByEmail,
  dbInsertAndGetUser,
} from "../../db/utils/users/users.db";
import {
  ErrorBadRequest,
  ErrorConflict,
  ErrorInternalServer,
  ErrorNotFound,
  ErrorUnauthorized,
} from "../../utils/errors";

import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import config from "../../config";
import { IUser } from "../../db/database";

export class AuthService {
  async setTokenToUser(user: IUser) {
    const token = await jwt.sign(
      {
        sub: user.id,
      },
      config.jwt.secret,
      { expiresIn: "24h" }
    );

    return {
      ...user,
      token,
    };
  }

  async signup(connection: IConnectionData, data: unknown) {
    try {
      let { error } = schemaAuth.validate(data);
      if (error) {
        console.log(error);
        ErrorBadRequest(connection.res, error);
        return;
      }
      let value = data as TAuth;

      const userAlready = await dbGetUserByEmail(value.email);
      if (userAlready) {
        ErrorConflict(connection.res);
        return;
      }

      const salt = bcrypt.genSaltSync();
      value.password = await bcrypt.hash(value.password, salt);

      const user = await dbInsertAndGetUser(value);

      console.log(user);
      if (!user) {
        ErrorInternalServer(connection.res);
        return;
      }

      delete user.password;

      sendData(connection.res, 201, {
        ...(await this.setTokenToUser(user)),
      });

      return;
    } catch (error) {
      ErrorInternalServer(connection.res);

      return;
    }
  }

  async login(connection: IConnectionData, data: unknown) {
    try {
      let { error } = schemaAuth.validate(data);
      if (error) {
        ErrorBadRequest(connection.res);
        return;
      }
      let value = data as TAuth;

      const user = await dbGetUserByEmail(value.email);

      if (!user) {
        ErrorNotFound(connection.res);
        return;
      } else if (!user.password) {
        ErrorInternalServer(connection.res);
        return;
      }

      const isValid = await bcrypt.compare(value.password, user.password);

      if (!isValid) {
        ErrorUnauthorized(connection.res);
        return;
      }

      delete user.password;

      sendData(connection.res, 200, {
        ...(await this.setTokenToUser(user)),
      });
    } catch (error) {
      ErrorInternalServer(connection.res);

      return;
    }
  }
}
