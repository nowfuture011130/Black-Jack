import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
const app = express();

app.use(cors());
app.use(express.json());
const api_key = "api_key";
const api_secret =
  "api_key";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    console.log(users);
    if (users.length !== 0) {
      console.log(users);
      return res.json({ message: "username registered" });
    }
    const userId = v4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    console.log("success sign up " + username);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    console.log(users);
    if (users.length === 0) {
      return res.json({ message: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );
    const token = serverClient.createToken(users[0].id);
    if (passwordMatch) {
      res.json({
        token,
        userId: users[0].id,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("server running.");
});
