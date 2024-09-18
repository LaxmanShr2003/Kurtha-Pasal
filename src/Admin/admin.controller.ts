import { Request, Response } from "express";
import { NextFunction } from "express";
import {
  AdminLoginSchemaType,
  createAdminSchema,
  createAdminType,
} from "./schema/admin.schema";
import Exception from "../lib/exception";
import { adminService } from "./admin.service";
import * as bcrypt from "bcrypt";
import { generateToken } from "../lib/jwt";
import { env } from "../config/env.config";

export const adminController = {
  async createAdmin(
    req: Request<{}, {}, createAdminType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const isAdmin = req.tokenPayload.role;
      if (isAdmin !== "ADMIN") throw new Exception("Sorry, Not permited!", 403);

      const adminData = req.body;
      const admin = await adminService.insert(adminData);
      res.json({
        status: "Success",
        data: admin,
        message: "Admin data saved successfully",
      });
    } catch (err) {
      next(err);
    }
  },
  async updateAdmin(
    req: Request<{ id }, {}, createAdminType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const isAdmin = req.tokenPayload.role;
      if (isAdmin !== "ADMIN") throw new Exception("Sorry, Not permited!", 403);
      const id = req.params.id;
      const data = req.body;
      const admin = await adminService.updateAdmin(id, data);
      res.json({
        status: "Success",
        data: admin,
        message: "Admin data updated",
      });
    } catch (err) {
      next(err);
    }
  },
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const isAdmin = req.tokenPayload.role;
      if (isAdmin !== "ADMIN") throw new Exception("Sorry, Not permited!", 403);

      const allData = await adminService.getAll();
      res.json({
        status: "Success",
        data: allData,
        message: "All admin data fetched",
      });
    } catch (err) {
      next(err);
    }
  },
  async getAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const isAdmin = req.tokenPayload.role;
      if (isAdmin !== "ADMIN") throw new Exception("Sorry, Not permited!", 403);
      const adminId = req.params.id;
      const admin = await adminService.getAdmin(adminId);
      res.json({
        status: "Success",
        data: admin,
        message: "Admin found successful",
      });
    } catch (err) {
      next(err);
    }
  },
  async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const isAdmin = req.tokenPayload.role;
      if (isAdmin !== "ADMIN") throw new Exception("Sorry, Not permited!", 403);

      const adminId = req.params.id;
      await adminService.remove(adminId);
      res.json({
        status: "Success",
        message: "Admin data deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  async adminlogin(
    req: Request<{}, {}, AdminLoginSchemaType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      const admin = await adminService.findPassword(data.email);
      const isMatched = await bcrypt.compareSync(data.password, admin.password);
      if (!isMatched) throw new Error("Password doesn't matched");
      const accessToken = generateToken({
        payload: {
          id: admin.id,
          role: admin.role,
        },
        secretKey: env.SECRETKEY as string,
        exp: "24h",
      });
      const refereshToken = generateToken({
        payload: {
          id: admin.id,
          role: admin.role,
        },
        secretKey: env.SECRETKEY as string,
        exp: "30d",
      });

      res.json({
        status: "Success",
        admin: admin,
        accessToken: accessToken,
        refereshToken: refereshToken,
        message: "Login successful",
      });
    } catch (err) {
      next(err);
    }
  },
};
