import { users } from "../server";
import { v4 as uuidv4 } from "uuid";
import {
  userIdErrorHandler,
  userExistsErrorHandler,
  userServerErrorHandler,
  userBodyErrorHandler,
} from "../users/userErrorHandler.js";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    await success(users, 200, res);
  } catch (error) {
    await userServerErrorHandler(res);
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    await userIdErrorHandler(req, res);
    const uuid = await getUUIDfromURL(req);
    const user = await getUser(uuid);

    if (user.length === 0) {
      await userExistsErrorHandler(res);
    }

    await success(user, 200, res);
  } catch (error) {
    await userServerErrorHandler(res);
  }
};

export const createOneUser = async (req: Request, res: Response) => {
  try {
    const user = JSON.parse(await getBodyData(req));

    if (!(await userBodyErrorHandler(user, res))) return;

    users.push({
      id: uuidv4(),
      username: user.username,
      age: user.age,
      hobbies: JSON.parse(user.hobbies.replace(/'/g, '"')),
    });

    await success(users.at(-1), 201, res);
  } catch (error) {
    await userServerErrorHandler(res);
  }
};

export const updateOneUser = async (req: Request, res: Response) => {
  try {
    await userIdErrorHandler(req, res);
    const uuid = await getUUIDfromURL(req);
    const user = await getUser(uuid);
    const data = JSON.parse(await getBodyData(req));
    if (!(await userBodyErrorHandler(data, res))) return;

    for (const key in users) {
      if (Object.hasOwnProperty.call(users, key)) {
        if (users[key].id === uuid) {
          user[key].username = data.username;
          user[key].age = data.age;
          user[key].hobbies = JSON.parse(data.hobbies.replace(/'/g, '"'));
        }
      }
    }

    await success(await getUser(uuid), 200, res);
  } catch (error) {
    await userServerErrorHandler(res);
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    await userIdErrorHandler(req, res);
    const uuid = await getUUIDfromURL(req);

    for (const key in users) {
      if (Object.hasOwnProperty.call(users, key)) {
        if (users[key].id === uuid) {
          users.splice(users.indexOf(users[key]), 1);
        }
      }
    }

    await success("", 204, res);
  } catch (error) {
    await userServerErrorHandler(res);
  }
};

export const getUUIDfromURL = async (req: Request) => req.url.split("/").at(-1);

export const getUser = async (uuid: string) => {
  const user = users.filter((data) => uuid === data.id);
  return user;
};

export const success = async (data, code: Number, res:Response) => {
  res.statusCode = code;
  res.end(JSON.stringify(data));
};

export const getBodyData = async (req) => {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  return Buffer.concat(buffers).toString();
};
