import { dbIsAdminUserById } from "../../db/utils/users/users.db";
import middlewareJwt from "../../middlewares/jwt.middleware";
import { IController } from "../../types/controllers.types";
import { IMethods, THandler } from "../../types/modules/common/responses.types";
import { Controller } from "../../utils/controllers/controller";
import { ErrorNotFoundRoute } from "../../utils/errors";
import { UsersService } from "./users.service";

export class UsersController extends Controller<UsersService> {
  private PUT: THandler = (req, res, urlPathes) => {
    if (!urlPathes || urlPathes?.length !== 0) {
      ErrorNotFoundRoute(res);
      return;
    }

    const connectionData = {
      req,
      res,
    };

    middlewareJwt(req, res, this.service.put);
  };

  private GET: THandler = (req, res, urlPathes) => {
    if (!urlPathes || urlPathes?.length !== 1 || !Number(urlPathes[0])) {
      ErrorNotFoundRoute(res);

      return;
    }

    const connectionData = {
      req,
      res,
    };
    

    dbIsAdminUserById

    middlewareJwt(req, res, this.service.get, urlPathes);
  };

  methodReducer: IMethods = {
    PUT: this.PUT,
    GET: this.GET,
  };
}
