import jwt from "jsonwebtoken";
import "dotenv/config";
export const verifyToken = (req, res, next) => {
   const token = req.cookies.token;
   if (!token) return res.status(401).json({ message: "Access denied" });
   // verify token if valid

   jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = user;
      next();
   });
};
