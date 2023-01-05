import http from "node:http";
import { requestListener } from "./routes/router.js";
import { generateUsersArray } from "./users/userCreate.js";
import * as dotenv from "dotenv";

dotenv.config();

const hostname = process.env.HOSTHAME as unknown as string;
const port = process.env.PORT as unknown as number;

const server = http.createServer(requestListener);
export const users = await generateUsersArray(0, 100);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


