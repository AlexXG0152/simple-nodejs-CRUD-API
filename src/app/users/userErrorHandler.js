export const userIdErrorHandler = async (req, res) => {
  const uuid = req.url.split("/").at(-1);
  if (
    !uuid.match(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
  ) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "userId is invalid" }));
  }
};

export const userBodyErrorHandler = async (user, res) => {
  if (
    typeof user.username !== "string" ||
    typeof user.age !== "number" ||
    typeof JSON.parse(user.hobbies.replace(/'/g, '"')) !== "object"
  ) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "body does not contain required fields" }));
    return false
  }
  return true
};

export const userNotExistsErrorHandler = async (res) => {
  res.statusCode = 404;
  res.end(JSON.stringify({ error: "userId doesn't exist" }));
};

export const userServerErrorHandler = async (res) => {
  res.statusCode = 500;
  res.end(JSON.stringify({ error: "server error" }));
};

// Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
// Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
