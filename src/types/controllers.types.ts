import { THandler } from "./modules/common/responses.types";

export interface IController {
  service: any;
  handlePath: THandler;
}

