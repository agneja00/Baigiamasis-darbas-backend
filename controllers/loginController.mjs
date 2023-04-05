import { usersList } from "../data/users.mjs";
import { comparePassword } from "../utils/hashing.mjs";
import { generateToken } from "../utils/token.mjs";

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const isEmailValid = typeof email === "string";
  const isPasswordValid = typeof password === "string";
  if (!isEmailValid || !isPasswordValid) {
    
    res.status(403).json({
      message: "Invalid credentials",
    });
    return;
  }

  const user = usersList.find((user) => user.email === email);
  if (!user) {
    res.status(403).json({
      message: "Invalid credentials",
    });
    return;
  }

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    res.status(403).json({
      message: "Invalid credentials",
    });
    return;
  }

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};