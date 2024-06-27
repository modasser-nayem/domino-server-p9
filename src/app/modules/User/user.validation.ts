import { z } from "zod";

const updateMyProfile = z.object({
  user: z
    .object({
      name: z.string().optional(),
      profileImg: z.string().url().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
  designation: z.string().optional(),
  about: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  dateOfBirth: z.string().datetime().optional(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  contactNo: z.string().optional(),
  language: z.optional(
    z.record(
      z.string(),
      z.enum(["Native", "Fluent", "Proficient", "Intermediate", "Basic"]),
    ),
  ),
  address: z
    .object({
      country: z.string(),
      district: z.string(),
      state: z.string(),
    })
    .optional(),
  skills: z.array(z.string()).optional(),
  education: z
    .object({
      institute: z.string(),
      subject: z.string(),
      startYear: z.string().datetime(),
      passingYear: z.string().datetime(),
      isComplete: z.boolean(),
    })
    .optional(),
  socialLinks: z
    .object({
      facebook: z.string().url().optional(),
      twitter: z.string().url().optional(),
      linkedIn: z.string().url().optional(),
      youtube: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .optional(),
});

const updateUserStatus = z.object({
  userId: z
    .string({ required_error: "userId is required" })
    .refine((value) => value !== "", { message: "userId is required" }),
  status: z.enum(["blocked", "unblock"], {
    required_error: "status is required",
  }),
});

const updateUserRole = z.object({
  userId: z
    .string({ required_error: "userId is required" })
    .refine((value) => value !== "", { message: "userId is required" }),
  role: z.enum(["student", "instructor", "admin"], {
    required_error: "role is required",
  }),
});

const userSchemaValidation = {
  updateMyProfile,
  updateUserStatus,
  updateUserRole,
};
export default userSchemaValidation;
