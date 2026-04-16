import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "./types/index.js";

// Typ för JWT-payload
interface JwtPayload {
	userId: string;
	role: string;
}

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(" ")[1]; // "Bearer TOKEN"

	if (!token) {
		return res.status(401).json({ error: "Token saknas" });
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string,
		) as JwtPayload;
		(req as AuthenticatedRequest).user = decoded; // Säker cast
		next();
	} catch (err) {
		return res.status(403).json({ error: "Ogiltig eller utgången token" });
	}
};
