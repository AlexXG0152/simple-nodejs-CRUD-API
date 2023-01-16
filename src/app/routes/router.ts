import { IncomingMessage, ServerResponse } from "node:http";
import { UserController } from "../controllers/user";

const User = new UserController();

export const routes = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    res.setHeader("Content-Type", "application/json");
    if (req.url!.endsWith("/api/users") && req.method === "GET") {
      await User.getAll(req, res);
    } else if (req.url!.includes("/api/users/") && req.method === "GET") {
      await User.getOne(req, res);
    } else if (req.url === "/api/users" && req.method === "POST") {
      await User.createOne(req, res);
    } else if (req.url!.includes("/api/users/") && req.method === "PUT") {
      await User.updateOne(req, res);
    } else if (req.url!.includes("/api/users/") && req.method === "DELETE") {
      await User.deleteOne(req, res);
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Resource not found" }));
    }
  } catch (error) {
    res.end(JSON.stringify({ error: error }));
  }
};
