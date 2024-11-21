import http from "http";
import { jsonParser } from "./middlewares/jsonParser.middleware";
import { urlToArray } from "./utils/urlConverts";
import {
  IHandlerArgs,
  IMessageBody,
} from "./types/modules/common/responses.types";

import fs from "fs";
import path from "path";

import { ErrorNotFoundRoute } from "./utils/errors";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import config from "./config";
import { serveSwagger, swaggerSpec } from "./swagger";
import * as swaggerUi from "swagger-ui-dist";
import { send } from "process";
import { sendResponse } from "./utils/sendResponse";
import extContentType from "./utils/contentType";

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
    server.listen(port, hostname, () =>
      console.log(`Server is running on port ${port}`)
    );
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
      console.log(urlPathes);
      switch (urlPathes[0]) {
        case "users":
          this.UsersModule.handlePath(...data);
          break;
        case "auth":
          this.AuthModule.handlePath(...data);
          break;
        case "api-docs":
          // console.log(console.log(JSON.stringify(swaggerSpec)));
          if (!urlPathes[1]) {
            serveSwagger(...data);
            break;
          }
          break;
        case "swagger.json":
          console.log("JSON");

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(swaggerSpec));

          break;
        default:
          // serveSwagger(...data);
          const staticPath = path.join(
            swaggerUi.getAbsoluteFSPath(),
            urlPathes[0] || ""
          );

          if (fs.existsSync(staticPath)) {
            fs.readFile(staticPath, (err, data) => {
              if (err) {
                ErrorNotFoundRoute(res);
                return;
              } else {
                const extname = path.extname(req.url || "");
                let contentType = extContentType(extname);

                if (urlPathes[0] == "swagger-initializer.js") {
                  const filePath = path.join(
                    __dirname,
                    "../../node_modules/swagger-ui-dist/swagger-initializer.js"
                  );

                  fs.readFile(filePath, "utf-8", (err, data) => {
                    if (err) {
                      // res.writeHead(404);
                      console.log(err);
                      res.end("File not found");
                      return;
                    }
                    console.log(filePath);

                    // Меняем стандартный URL JSON в JS
                    const modifiedJs = data.replace(
                      "https://petstore.swagger.io/v2/swagger.json",
                      "./swagger.json"
                    );

                    // res.writeHead(200, {
                    //   "Content-Type": "application/javascript",
                    // });
                    res.end(modifiedJs);

                    return;
                  });
                  return;
                } else {
                  // res.end("DD");

                  sendResponse(res, 200, contentType, data);

                  return;
                }

                ErrorNotFoundRoute(res);

                return;
              }
            });
          } else {
            return;
          }
      }
    });
  }
}
