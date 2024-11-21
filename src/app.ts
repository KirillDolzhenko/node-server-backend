import config from "./config";
import { ServerApp } from "./server";

// const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };

// const server = http.createServer((req, res) => {
//   if (!req.url) {
//     return;
//   }

//   const urlPathes = urlToArray(req.url);

//   if (urlPathes?.length == 0) {
//     return;
//   }

//   if (urlPathes[0] == "users") {
//     middlewareJsonParser(req, res, userRoutes, urlPathes);
//   }

//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello, world!");
// });

// server.listen(config.server.port, config.server.hostname, () => {
//   console.log(
//     `Server running at http://${config.server.hostname}:${config.server.port}/`
//   );
// });


const server = new ServerApp();
server.start(config.server.port, config.server.hostname);
