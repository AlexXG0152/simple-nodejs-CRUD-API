import http from "node:http";
import * as dotenv from "dotenv";
import { routes } from "../app/routes/router";
import { generateUsersArray } from "../app/users/userCreate";
import { IUser } from "../app/interfaces/user.interface";

dotenv.config();

const hostname = process.env.HOSTHAME as unknown as string;
const port = process.env.PORT as unknown as number;

export const server = http.createServer(routes);
export let users: IUser[];

server.listen(port, hostname, async () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  users = await generateUsersArray(1, 100);
});
