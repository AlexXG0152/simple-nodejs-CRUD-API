import { IncomingMessage, ServerResponse } from "node:http";
import { v4 as uuidv4 } from "uuid";
import { users } from "../server";
import {
  userIdErrorHandler,
  userNotExistsErrorHandler,
  userServerErrorHandler,
  userBodyErrorHandler,
} from "../users/userErrorHandler";
import { IUser } from "../interfaces/user.interface";

export const getAllUsers = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    await success(users, 200, res);
  } catch (error) {
    await userServerErrorHandler(res);
  }
};

export const getOneUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    await userIdErrorHandler(req, res);
    const uuid = await getUUIDfromURL(req)!;
    const user = await getUser(uuid!);

    if (!user) {
      return await userNotExistsErrorHandler(res);
    }

    await success(user, 200, res);
  } catch (error) {
    await userServerErrorHandler(res);
  }
};

export const createOneUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    const user = JSON.parse(await getBodyData(req));

    if (!(await userBodyErrorHandler(user, res))) return;

    users.push({
      id: uuidv4(),
      username: user.username,
      age: user.age,
      hobbies: JSON.parse(user.hobbies.replace(/'/g, '"')),
    });

    await success(users.at(-1)!, 201, res);
  } catch (error) {
    await userServerErrorHandler(res);
  }
};

export const updateOneUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    await userIdErrorHandler(req, res);
    const uuid = await getUUIDfromURL(req);
    const user = await getUser(uuid!);

    if (!user) {
      return await userNotExistsErrorHandler(res);
    }

    const data = JSON.parse(await getBodyData(req));

    if (!(await userBodyErrorHandler(data, res))) return;

    for (const key in users) {
      if (Object.hasOwnProperty.call(users, key)) {
        if (users[key].id === uuid) {
          user.username = data.username;
          user.age = data.age;
          user.hobbies = JSON.parse(data.hobbies.replace(/'/g, '"'));
        }
      }
    }

    await success(await getUser(uuid!), 200, res);
  } catch (error) {
    await userServerErrorHandler(res);
  }
};

export const deleteOneUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    await userIdErrorHandler(req, res);
    const uuid = await getUUIDfromURL(req);
    let deleted = false;

    for (const key in users) {
      if (Object.hasOwnProperty.call(users, key)) {
        if (users[key].id === uuid) {
          users.splice(users.indexOf(users[key]), 1);
          deleted = true;
        }
      }
    }
    if (!deleted) return await userNotExistsErrorHandler(res);

    await success({}, 204, res);
  } catch (error) {
    await userServerErrorHandler(res);
  }
};

export const getUUIDfromURL = async (
  req: IncomingMessage
): Promise<string | undefined> => req.url!.split("/").at(-1);

export const getUser = async (uuid: string) => {
  const user = users.filter((data) => uuid === data.id);
  return user[0];
};

export const success = async (
  data: object | IUser | IUser[],
  code: number,
  res: ServerResponse
): Promise<void> => {
  res.statusCode = code;
  res.end(JSON.stringify(data));
};

export const getBodyData = async (req: IncomingMessage): Promise<string> => {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  return Buffer.concat(buffers).toString();
};
