import http from "node:http";
import cluster from "node:cluster";
import process from "node:process";
import { IncomingMessage, ServerResponse } from "node:http";
import { cpus } from "node:os";
import { routes } from "../routes/router";
import { Worker } from "cluster";
import { getBodyData } from "../controllers/user";

const ports: any[] = await makePorts();
let instance = 0;

export const multi = async (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
  multiport: number,
  hostname: string
) => {
  const numCPUs = cpus().length;

  if (cluster.isPrimary) {
    console.log(`Master cluster setting up ${numCPUs} workers`);
    console.log(`Primary ${process.pid} is running`);
    let worker: Worker, port: number | undefined;

    for (let i = 1; i <= numCPUs; i++) {
      port = Number(multiport) + i;
      worker = cluster.fork({ port: port });
      server = http
        .createServer(async (req: IncomingMessage, res: ServerResponse) => {
          await routes(req, res);
        })
        .listen(Number(multiport) + i, hostname, async () => {
          console.log(
            `Server running at http://${hostname}:${Number(multiport) + i}/`
          );
        });
    }

    cluster.on("online", function (worker) {
      console.log(`Worker ${worker.process.pid} is listening`);
    });

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    server = http
      .createServer(async (req: IncomingMessage, res: ServerResponse) => {
        await balancer(req, res, ports);
        res.end();
      })
      .listen(multiport, hostname, async () => {
        console.log(
          `Server running at http://${hostname}:${multiport}/ with PID ${process.pid}`
        );
      });
  }
};

const balancer = async (
  req: IncomingMessage,
  res: ServerResponse,
  ports: number[][]
) => {
  let data = await getBodyData(req);
  const options: { method?: any; headers?: any; body?: any } = {
    method: req.method,
    headers: { "Content-Type": "application/json" },
  };
  if (req.method === "POST" || req.method === "PUT") {
    options.body = data;
  }
  // data = "";

  let url = `http://127.0.0.1:${
    ports[instance] === ports[ports.length]
      ? ((instance = 0), ports[instance])
      : ports[instance]
  }${req.url}`;

  console.log(`[${options.method}] --- ${url}`);
  const response = await fetch(url, options);

  if (response.status === 200 || response.status === 201) {
    const answer = await response.json();
    res.end(JSON.stringify(answer));
  }

  if (response.status === 204) {
    res.end(JSON.stringify("Deleted successfully"));
  }

  if (response) {
    instance = instance + 1;
  }
};

export async function makePorts() {
  const ports = [];
  for (let i = 1; i <= cpus().length; i++) {
    ports.push([4000 + i]);
  }
  return ports;
}
