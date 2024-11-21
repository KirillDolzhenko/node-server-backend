import http from "http";
import { EnumContentType } from "../types/modules/common/responses.types";

export const sendResponse = async (
  res: http.ServerResponse<http.IncomingMessage>,
  statusCode: number,
  contentType: string,
  data: unknown
) => {
  res.setHeader("Content-Type", contentType);
  res.statusCode = statusCode;

  if (data) {
    if (contentType == EnumContentType.JSON) {
      res.end(
        JSON.stringify({
          data,
          statusCode,
        })
      );
    } else {
      res.end(data);
    }
  } else {
    res.end();
  }
};

export const sendData = (
  res: http.ServerResponse<http.IncomingMessage>,
  statusCode: number,
  data: object
) => {
  sendResponse(res, statusCode, EnumContentType.JSON, data);
};

export const sendError = (
  res: http.ServerResponse<http.IncomingMessage>,
  statusCode: number,
  error: string,
  message?: string,
  details?: object
) => {
  sendResponse(res, statusCode, EnumContentType.JSON, {
    error,
    message,
    details,
  });
};
