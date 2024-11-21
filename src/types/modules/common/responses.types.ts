import http from "http";

export type IMessageBody = http.IncomingMessage & {
  body: unknown;
};

export type IHandlerArgs = [
  IMessageBody,
  http.ServerResponse<http.IncomingMessage>,
  string[]?
];

export type THandler = (
  req: IMessageBody,
  res: http.ServerResponse<http.IncomingMessage>,
  urlPathes?: string[]
) => void;

export interface IConnectionData {
  req: IMessageBody;
  res: http.ServerResponse<http.IncomingMessage>;
}

export type THandlerService = (
  connection: IConnectionData,
  data: unknown,
  urlPathes?: string[]
) => void;

export type THandlerMiddleware = (
  req: IMessageBody,
  res: http.ServerResponse<http.IncomingMessage>,
  route: THandlerService,
  urlPathes?: string[]
) => void;

// export type THandlePath = (
//     req: IMessageBody,
//     res: http.ServerResponse<http.IncomingMessage>,
//     urlPathes?: string[]
//   ) => void;

export interface IRoutes {
  [keys: string]: THandler;
}

export interface IMethods {
  [keys: string]: THandler;
}

export enum EnumContentType {
  JSON = "application/json",
  TEXT = "text/plain",
}
