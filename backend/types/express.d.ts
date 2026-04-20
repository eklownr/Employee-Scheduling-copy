import "express";

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}

export {}; // Gör filen till en modul
