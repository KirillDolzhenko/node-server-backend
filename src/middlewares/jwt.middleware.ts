import config from "../config";
import { ErrorForbidden } from "../utils/errors";
import {
  THandler,
  THandlerMiddleware,
} from "./../types/modules/common/responses.types";
import * as jwt from "jsonwebtoken";

const middlewareJwt: THandlerMiddleware = (req, res, route, urlPathes) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    ErrorForbidden(res);
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err || !decoded) {
      ErrorForbidden(res);

      return;
    }

    const body = req.body as object;

    route(
      {
        req,
        res,
      },
      {
        data: {
          ...body,
        },
        id: decoded.sub,
      },
      urlPathes
    );
  });

  return;
};

export default middlewareJwt;
