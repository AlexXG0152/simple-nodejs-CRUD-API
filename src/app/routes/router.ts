import { IncomingMessage, ServerResponse } from "node:http";
import {
  getAllUsers,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
} from "../controllers/user";

export const routes = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    res.setHeader("Content-Type", "application/json");
    if (req.url!.endsWith("/api/users") && req.method === "GET") {
      await getAllUsers(req, res);
    } else if (req.url!.includes("/api/users/") && req.method === "GET") {
      await getOneUser(req, res);
    } else if (req.url === "/api/users" && req.method === "POST") {
      await createOneUser(req, res);
    } else if (req.url!.includes("/api/users/") && req.method === "PUT") {
      await updateOneUser(req, res);
    } else if (req.url!.includes("/api/users/") && req.method === "DELETE") {
      await deleteOneUser(req, res);
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Resource not found" }));
    }
  } catch (error) {
    res.end(JSON.stringify({ error: error }));
  }
};
