import { z } from "zod";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

export const createAdminSchema = z.object({
  email: z.string({ required_error: "Valid email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "password must be atleast 8 characters" })
    .refine((value) => passwordRegex.test(value), {
      message: "Invalid password format",
    }),
  role: z.string({ required_error: "Role is required" }),
});

export type createAdminType = z.infer<typeof createAdminSchema>;

export const adminloginSchema = z.object({
  email: z.string({ required_error: "Valid email is required" }).email(),
  role: z.string({ required_error: "Role is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "password must be atleast 8 characters" })
    .refine((value) => passwordRegex.test(value), {
      message: "Invalid password format",
    }),
});

export type AdminLoginSchemaType = z.infer<typeof adminloginSchema>


export const adminPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: 'password too short' })
    .max(56, { message: 'password too long' })
    .refine((value) => passwordRegex.test(value), {
      message: "Invalid password format",
    }),
  confirmPassword: z
    .string()
    .min(8, { message: 'password too short' })
    .max(56, { message: 'password too long' })
    .refine((value) => passwordRegex.test(value), {
      message: "Invalid password format",
    })

}).strict().refine((data)=>data.newPassword===data.confirmPassword,{
  message:"New password and confirm password is not matched",
  
})

export type adminForgotPasswordType = z.infer<typeof adminPasswordSchema>
