import { v4 as createId } from "uuid";
import { hashPassword } from "../utils/hashing.mjs";
import { usersList } from "../data/users.mjs";

export const registerController = async (req, res) => {

  const { email, password, firstName, lastName, adress, gender, accept, subscribe } = req.body;

  const isEmail = typeof email === "string";
  const isPassword = typeof password === "string" && password.length > 6;
  const isFirstName = typeof firstName === "string";
  const isLastName = typeof lastName === "string";
  const isAdress = typeof adress === "string";
  const isGender = typeof gender === "string";
  const isAccept = typeof accept === "boolean";
  const isSubscribe = typeof subscribe === "boolean";

  //validacijos

  if (!isEmail || !isPassword || !isFirstName || !isLastName || !isAdress || !isGender || !isAccept || !isSubscribe ) {
    res.status(400).json({ message: "Bad register data" });
    return;
  }



  // if (!isFirstName || !isLastName || !isAdress || !isGender || !isAccept || !isSubscribe) {
  //   res.status(400).json({ message: "Bad register data" });
  //   return;
  // }

  const hasUser = usersList.some((user) => user.email === email);
  if (hasUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = {
    _id: createId(),
    email,
    password: await hashPassword(password),
    firstName,
    lastName,
    adress,
    gender,
    accept,
    subscribe,
  };

  usersList.push(user);

  res.json({ message: "ok" });
};
