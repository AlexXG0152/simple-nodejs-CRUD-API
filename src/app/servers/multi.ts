import http from "node:http";
import cluster from "node:cluster";
import process from "node:process";
import { cpus } from "node:os";
import { routes } from "../routes/router";

export const multi = async (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
  multiport: number,
  hostname: string
) => {
  const numCPUs = cpus().length;
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection In this case it is an HTTP server
    server = http.createServer(routes).listen(multiport, hostname, async () => {
      console.log(`Server running at http://${hostname}:${multiport}/`);
    });

    console.log(`Worker ${process.pid} started`);
  }
};
