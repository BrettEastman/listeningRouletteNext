const usersSchema = {
  username: "string",
  password: "string",
  email: "string",
  createdAt: "timestamp",
  updatedAt: "timestamp",
};

const lrSchema = {
  name: "string",
  album: "string"(required),
};

const messageSchema = {
  name: "string",
  body: "string",
};
