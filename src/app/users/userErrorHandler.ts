import { IncomingMessage, ServerResponse } from "node:http";
import { IUser } from "../interfaces/user.interface";

export const userIdErrorHandler = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  const uuid = req.url!.split("/").at(-1);
  if (
    !uuid?.match(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
  ) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "userId is invalid" }));
  }
};

export const userBodyErrorHandler = async (
  user: IUser,
  res: ServerResponse
): Promise<boolean> => {
  if (
    typeof user.username !== "string" ||
    typeof user.age !== "number" ||
    typeof JSON.parse(
      (user.hobbies as unknown as string).replace(/'/g, '"')
    ) !== "object"
  ) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "body does not contain required fields" }));
    return false;
  }
  return true;
};

export const userNotExistsErrorHandler = async (res: { statusCode: number; end: (arg0: string) => void; }) => {
  res.statusCode = 404;
  res.end(JSON.stringify({ error: "userId doesn't exist" }));
};

export const userServerErrorHandler = async (
  res: ServerResponse
): Promise<void> => {
  res.statusCode = 500;
  res.end(JSON.stringify({ error: "server error" }));
};
