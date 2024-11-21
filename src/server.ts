import http from "http";
import { jsonParser } from "./middlewares/jsonParser.middleware";
import { urlToArray } from "./utils/urlConverts";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import config from "./config";
import { serveSwagger, swaggerSpec } from "./swagger";
import staticFilesHandler from "./swagger/staticFilesHandler";
import {
  IHandlerArgs,
  IMessageBody,
  EnumContentType,
} from "./types/modules/common/responses.types";

export class ServerApp {
  private AuthModule = AuthModule;
  private UsersModule = UsersModule;

  start(port: number, hostname: string) {
    const server = http.createServer((req, res) => {
      res.setHeader("Access-Control-Allow-Origin", config.cors);
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );

      if (req.method === "OPTIONS") {
        res.statusCode = 204;
        return res.end();
      }

      this.handleRequest(req, res);
    });

    server.listen(port, hostname, () => {
      console.log("======================");
      console.log(
        `\x1b[1mServer\x1b[0m\x1b[34m is running on link: \x1b[4mhttp://${hostname}:${port}\x1b[0m`
      );
      console.log("---------------------");
      console.log(
        `\x1b[1mSwagger\x1b[0m\x1b[34m is running on link: \x1b[4mhttp://${hostname}:${port}/api-docs\x1b[0m`
      );
      console.log("======================");
    });
  }

  private async handleRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ) {
    if (!req.url || !req.method) {
      return;
    }

    const urlPathes = urlToArray(req.url);

    jsonParser(req, res, () => {
      const data: IHandlerArgs = [req as IMessageBody, res, urlPathes];
      switch (urlPathes[0]) {
        case "users":
          this.UsersModule.handlePath(...data);
          break;
        case "auth":
          this.AuthModule.handlePath(...data);
          break;
        case "api-docs":
          if (!urlPathes[1]) {
            serveSwagger(...data);
            break;
          }
          break;
        case "swagger.json":
          res.setHeader("Content-Type", EnumContentType.JSON);
          res.statusCode = 200;
          res.end(JSON.stringify(swaggerSpec));

          break;
        default:
          staticFilesHandler(...data);
      }
    });
  }
}
