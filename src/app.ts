import config from "./config";
import { ServerApp } from "./server";

const server = new ServerApp();
server.start(config.server.port, config.server.hostname);
