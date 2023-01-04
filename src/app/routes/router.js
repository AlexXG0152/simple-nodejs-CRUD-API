import {
  getAllUsers,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser,
} from "../controllers/user.js";

export const requestListener = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.url.endsWith("/api/users") && req.method === "GET") {
    await getAllUsers(req, res);
  } else if (req.url.includes("/api/users/") && req.method === "GET") {
    await getOneUser(req, res);
  } else if (req.url === "/api/users" && req.method === "POST") {
    await createOneUser(req, res);
  } else if (req.url.includes("/api/users/") && req.method === "PUT") {
    await updateOneUser(req, res);
  } else if (req.url.includes("/api/users/") && req.method === "DELETE") {
    await deleteOneUser(req, res);
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Resource not found" }));
  }
};














// req.url
//   .split("/")
//   .at(-1)
//   .match(
//     /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
//   )

//   switch (req.url) {
//     case (req.url === "/api/users") && (req.method === "GET"):
//       res.writeHead(200);
//       res.end(JSON.stringify(users));
//       break;
//     case "/api/users/${userId}" && req.method === "GET":
//       res.writeHead(200);
//       res.end(authors);
//       break;
//     case "/api/users" && req.method === "POST":
//       res.writeHead(200);
//       res.end(authors);
//       break;
//     case "/api/users/${userId}" && req.method === "PUT": //put
//       res.writeHead(200);
//       res.end(authors);
//       break;
//     case "/api/users/${userId}" && req.method === "DELETE":
//       res.writeHead(200);
//       res.end(authors);
//       break;
//     default:
//       res.writeHead(404);
//       res.end(JSON.stringify({ error: "Resource not found" }));
//   }
