import http from "node:http";
import { routes } from "../app/routes/router";
import { generateUsersArray } from "../app/users/userCreate";
import * as dotenv from "dotenv";

dotenv.config();

const hostname = process.env.HOSTHAME as unknown as string;
const port = process.env.PORT as unknown as number;

const server = http.createServer(routes);
export const users = await generateUsersArray(0, 100);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


