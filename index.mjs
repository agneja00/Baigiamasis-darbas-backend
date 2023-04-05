import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { homeController } from "./controllers/homeController.mjs";
import { registerController } from "./controllers/registerController.mjs";
import { loginController } from "./controllers/loginController.mjs";
import { decodeToken } from "./utils/token.mjs";
import { usersList } from "./data/users.mjs";

dotenv.config();

const app = express()
const port = process.env.PORT;
const bodyParser = express.json();

const corsMiddleware = cors();

app.use(corsMiddleware);
app.use(bodyParser);
app.use((req, _, next) => {
  if (req.headers.token) {
    const authId = decodeToken(req.headers.token)?.id;
    const user = usersList.find(({ _id }) => _id === authId);
    if (user) req.user = user;
  }
  next();
});
app.get('/home-page', homeController)
app.post('/register', registerController);
app.post("/login", loginController);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})