import swaggerUi from "swagger-ui-dist";
import { THandler } from "../types/modules/common/responses.types";
import { ErrorNotFound, ErrorNotFoundRoute } from "../utils/errors";
import { sendResponse } from "../utils/sendResponse";
import fs from "fs";
import path from "path";
import extContentType from "../utils/contentType";

const staticFilesHandler: THandler = (req, res, urlPathes) => {
  if (!urlPathes) {
    ErrorNotFoundRoute(res);

    return;
  }

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
            "../../../node_modules/swagger-ui-dist/swagger-initializer.js"
          );

          console.log(filePath);

          fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
              ErrorNotFound(res);
              return;
            }

            const modifiedJs = data.replace(
              "https://petstore.swagger.io/v2/swagger.json",
              "./swagger.json"
            );

            sendResponse(res, 200, "application/javascript", modifiedJs);

            return;
          });
          return;
        } else {
          sendResponse(res, 200, contentType, data);

          return;
        }
      }
    });
  } else {
    ErrorNotFoundRoute(res);
    return;
  }
};

export default staticFilesHandler;
