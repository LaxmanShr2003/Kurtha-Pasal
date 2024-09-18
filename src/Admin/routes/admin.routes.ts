import { Router } from "express";
import validateToken from "../../middleware/validateToken";
import ZOD from "../../lib/zod";
import { createAdminSchema } from "../schema/admin.schema";
import { adminController } from "../admin.controller";

const adminRouter = (router: Router) => {
  router.post(
    "/create",
    validateToken({ checkAdmin: true }),
    ZOD.requestAsyncParser({
      schema: createAdminSchema,
      type: "Body",
      isFiles: false,
    }),
    adminController.createAdmin
  );
};
