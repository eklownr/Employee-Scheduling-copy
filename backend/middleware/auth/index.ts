// // src/middleware/auth.ts
// import type { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// // Utöka Request-typen för att inkludera användarinfo
// declare global {
  // namespace Express {
    // interface Request {
      // user?: { id: string; email: string };
    // }
  // }
// }

// const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Byt ut i produktion

// export const authenticate = (
  // req: Request,
  // res: Response,
  // next: NextFunction
// ) => {
  // const token = req.header("Authorization")?.replace("Bearer ", "");

  // if (!token) {
    // return res.status(401).json({ error: "Ingen token tillhandahållen" });
  // }

  // try {
    // const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    // req.user = decoded;
    // next();
  // } catch (err) {
    // return res.status(403).json({ error: "Ogiltig eller utgången token" });
  // }
// };   