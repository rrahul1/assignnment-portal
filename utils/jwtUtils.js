import jwt from "jsonwebtoken";

export const generateToken = (userId, role) => {
   return jwt.sign({ _id: userId, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
   });
};
