import http from "node:http";
import process from "node:process";
import * as dotenv from "dotenv";
import { IUser } from "../app/interfaces/user.interface";
import { single } from "./servers/single";
import { multi } from "./servers/multi";
import { generateUsersArray } from "./users/userCreate";

dotenv.config();

const multiServer = true;
const hostname = process.env.HOSTHAME as unknown as string;
const port = process.env.PORT as unknown as number;
const multiport = process.env.MULTIPORT as unknown as number;

export const users: IUser[] = await generateUsersArray(1, 100);

export let server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

if (!multiServer) {
  await single(server!, port, hostname);
}

if (multiServer) {
  await multi(server!, multiport, hostname);
}
