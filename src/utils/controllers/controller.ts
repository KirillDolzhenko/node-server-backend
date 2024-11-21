import { IMethods, THandler } from "../../types/modules/common/responses.types";
import { ErrorNotFoundRoute } from "../errors";

export class Controller<T> {
  service: T;

  constructor(private readonly servicePassed: T) {
    this.service = servicePassed;
  }

  methodReducer: IMethods = {};
  handlePath: THandler = (req, res, urlPathes) => {
    if (!req.method) {
      return;
    }

    const methodReducer = this.methodReducer[String(req.method)];

    if (methodReducer) {
      methodReducer(req, res, urlPathes?.slice(1));

      return;
    }

    ErrorNotFoundRoute(res);
  };
}
