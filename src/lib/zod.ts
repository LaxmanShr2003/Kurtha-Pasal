import { NextFunction, Response, Request } from "express";
import { z, ZodTypeAny, ZodError } from "zod";

export default class ZOD {
  static parse = <T>(
    schema: z.ZodObject<any, "strip", z.ZodTypeAny, object, object>,
    data: T
  ) => schema.parse(data);

  static requestAsyncParser =
    (
      ...args: {
      schema: ZodTypeAny;
        type: "Body" | "Params" | "Query";
        isFiles?: boolean;
      }[]
    ) =>
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
        for (const item of args) {
          let response;
          if (item.type === "Body") {
            response = await item.schema.parseAsync(req.body);
          } else if (item.type === "Params") {
            response = await item.schema.parseAsync(req.params);
          } else if (item.type === "Query") {
            response = await item.schema.parseAsync(req.query);
          }
          if (!response?.success) {
            return next(response!.error);
          }
          if (item.type === "Body") {
            req.body = response.data;
          } else if (item.type === "Params") {
            req.params = response.data;
          } else if (item.type === "Query") {
            req.query = response.data;
          }
        }
        next();
      } catch (error) {
        next(error);
      }
    };
}
