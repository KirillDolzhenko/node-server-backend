import fs from "fs";
import path from "path";
import * as swaggerUi from "swagger-ui-dist";
import swaggerJSDoc from "swagger-jsdoc";
import config from "../swagger.json";
import { THandler } from "./types/modules/common/responses.types";

export const swaggerDefinition = config;

const options = {
  swaggerDefinition,
  apis: ["./api.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

export const serveSwagger: THandler = (req, res) => {
  const swaggerHtml = fs.readFileSync(
    path.join(swaggerUi.getAbsoluteFSPath(), "index.html"),
    "utf-8"
  );

  res.end(swaggerHtml);
};
