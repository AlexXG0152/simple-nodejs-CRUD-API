import { IncomingMessage, ServerResponse } from "node:http";
import { v4 as uuidv4 } from "uuid";
import { users } from "../server";
import { UserErrorsHandler } from "../users/userErrorHandlers";
import { IUser } from "../interfaces/user.interface";

const UserError = new UserErrorsHandler();

export class UserController {
  getAll = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      await this.success(users, 200, res);
    } catch (error) {
      await UserError.userServerError(res);
    }
  };

  getOne = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
      await UserError.userIdError(req, res);
      const uuid = await this.getUUIDfromURL(req)!;
      const user = await this.getUser(uuid!);

      if (!user) {
        return await UserError.userNotExistsError(res);
      }

      await this.success(user, 200, res);
    } catch (error) {
      await await UserError.userServerError(res);
    }
  };

  createOne = async (
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> => {
    try {
      const user = JSON.parse(await getBodyData(req));

      if (!(await UserError.userBodyError(user, res))) return;

      users.push({
        id: uuidv4(),
        username: user.username,
        age: user.age,
        hobbies: JSON.parse(user.hobbies.replace(/'/g, '"')),
      });

      await this.success(users.at(-1)!, 201, res);
    } catch (error) {
      await UserError.userServerError(res);
    }
  };

  updateOne = async (
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> => {
    try {
      await UserError.userIdError(req, res);
      const uuid = await this.getUUIDfromURL(req);
      const user = await this.getUser(uuid!);

      if (!user) {
        return await UserError.userNotExistsError(res);
      }

      const data = JSON.parse(await getBodyData(req));

      if (!(await UserError.userBodyError(data, res))) return;

      for (const key in users) {
        if (Object.hasOwnProperty.call(users, key)) {
          if (users[key].id === uuid) {
            user.username = data.username;
            user.age = data.age;
            user.hobbies = JSON.parse(data.hobbies.replace(/'/g, '"'));
          }
        }
      }

      await this.success(await this.getUser(uuid!), 200, res);
    } catch (error) {
      await UserError.userServerError(res);
    }
  };

  deleteOne = async (
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> => {
    try {
      await UserError.userIdError(req, res);
      const uuid = await this.getUUIDfromURL(req);
      let deleted = false;

      for (const key in users) {
        if (Object.hasOwnProperty.call(users, key)) {
          if (users[key].id === uuid) {
            users.splice(users.indexOf(users[key]), 1);
            deleted = true;
            console.log("Deleted successfully!");
          }
        }
      }
      if (!deleted) return await UserError.userNotExistsError(res);

      await this.success({}, 204, res);
    } catch (error) {
      await await UserError.userServerError(res);
    }
  };

  getUUIDfromURL = async (req: IncomingMessage): Promise<string | undefined> =>
    req.url!.split("/").at(-1);

  getUser = async (uuid: string) => {
    const user = users.filter((data) => uuid === data.id);
    return user[0];
  };

  success = async (
    data: object | IUser | IUser[],
    code: number,
    res: ServerResponse
  ): Promise<void> => {
    res.statusCode = code;
    res.end(JSON.stringify(data));
  };
}

export const getBodyData = async (req: IncomingMessage): Promise<string> => {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  return Buffer.concat(buffers).toString();
};
