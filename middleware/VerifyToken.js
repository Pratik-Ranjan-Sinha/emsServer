import jwt from "jsonwebtoken";
import "dotenv/config";
export const verifyToken = (req, res, next) => {
   // console.log(req.headers);
   const token = req.headers["access_token"];
   // console.log(token);

   if (!token) return res.status(401).json({ message: "Access denied" });

   jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = user;
      next();
   });
};
