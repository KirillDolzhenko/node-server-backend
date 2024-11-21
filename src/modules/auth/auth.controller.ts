import { IController } from "../../types/controllers.types";
import { IMethods, THandler } from "../../types/modules/common/responses.types";
import { Controller } from "../../utils/controllers/controller";
import { ErrorNotFoundRoute } from "../../utils/errors";
import { AuthService } from "./auth.service";

export class AuthController extends Controller<AuthService> {
  private POST: THandler = (req, res, urlPathes) => {
    if (!urlPathes || urlPathes?.length !== 1) {
      return;
    }

    const connectionData = {
      req,
      res,
    };

    switch (urlPathes[0]) {
      case "login":
        this.service.login(connectionData, req.body);
        break;
      case "signup":
        this.service.signup(connectionData, req.body);
        break;
      default:
        ErrorNotFoundRoute(res);
        break;
    }
  };

  methodReducer: IMethods = {
    POST: this.POST,
  };
}
