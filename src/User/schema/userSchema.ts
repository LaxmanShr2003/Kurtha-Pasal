import {z}  from 'zod'

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

export const createUserSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3, { message: "First name should be more than 3 characters" })
    .max(20, { message: "Name is more too long." }),

    lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, { message: "Last name should be more than 3 characters" })
    .max(20, { message: "Name is more too long." }),

    gender:z
    .string({required_error:"Gender is required"}),

    email:z
    .string({required_error:"Valid email is required"}).email(),

    phoneNumber:z
    .string({required_error:"Phonenumber is required"}).optional(),

    password:z
    .string({required_error:"Password is required"})
    .min(8,{message:"password must be atleast 8 characters"})
    .refine((value) =>  passwordRegex.test(value),{message:"Invalid password format"}),

    role:z
    .string({required_error:"Role is required"}),
});

export type createUserSchemaType = z.infer<typeof createUserSchema>


export const userloginSchema = z.object({
  email: z.string({ required_error: "Valid email is required" }).email(),
  role: z.string({ required_error: "Role is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "password must be atleast 8 characters" })
    .refine((value) => passwordRegex.test(value), {
      message: "Invalid password format"
    })
}).strict()

export  type UserLoginSchemaType = z.infer<typeof userloginSchema>