import { NextFunction, Request, Response } from "express";

export const requestLoggerMiddleware = ({ logger }: {logger: (...args: any[]) => void}) => (req: Request, res: any, next: NextFunction) => {
    logger("INCOMING REQUEST <<<", req.method, req.url, req.hostname);
    res.on("finish", () => {
        logger("RESPONSE >>>", res);
    });
    next();
};
