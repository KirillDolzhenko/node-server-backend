import { THandler } from "./common/responses.types";

export interface IController {
  service: any;
  handlePath: THandler;
}
