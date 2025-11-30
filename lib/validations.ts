import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

export const transactionSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().min(1, "Description is required").max(255, "Description must be less than 255 characters"),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.date(),
})

export const createTransactionSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }).transform((val) => Number(val)),
  description: z.string().min(1, "Description is required").max(255, "Description must be less than 255 characters"),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }).transform((val) => new Date(val)),
})

export type TransactionFormData = z.infer<typeof createTransactionSchema>
export type Transaction = z.infer<typeof transactionSchema>
