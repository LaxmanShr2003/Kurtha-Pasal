import { NextFunction, Request, Response } from "express";
import { env } from "../config/env.config";
import { verifyToken } from "../lib/jwt";

export const tokenTypes = {
  ACCESS: env.SECRETKEY,
};

export  default const  validateToken = ({
  checkAdmin = false,
  checkEmployee = false,
  checkCustomer = false,
  tokenType = "ACCESS",
}: {
  tokenType?: keyof typeof tokenTypes;
  checkAdmin?: boolean;
  checkEmployee?: boolean;
  checkCustomer?: boolean;
}) => {
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.replace("bearer ", " ");
      if (!token) return res.status(400).json({ message: "Token Missing" });
      4;

      const decode = verifyToken({
        data: token,
        secretKey: env.SECRETKEY as string,
      });

      if (!decode) throw new Error("Token expired");

      if (!decode || (checkAdmin && decode.role !== "ADMIN")) {
        throw new Error("Unauthorized admin");
      }

      if (!decode || (checkEmployee && decode.role !== "EMPLOYEE")) {
        throw new Error("Unauthorized admin");
      }

      if (!decode || (checkCustomer && decode.role !== "CUSTOMER")) {
        throw new Error("Unauthorized admin");
      }

      req.tokenPayload = decode;
      next();
    } catch (err) {
      next(err);
    }
  };
};


