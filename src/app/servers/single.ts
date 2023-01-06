import http from "node:http";
import { routes } from "../routes/router";

export const single = async (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
  port: number,
  hostname: string
) => {
  server = http.createServer(routes);
  server.listen(port, hostname, async () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
};
