"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createTransactionSchema } from "@/lib/validations"
import { ArrowDownRight, ArrowUpRight, Calendar, DollarSign, FileText } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
  amount: string
  description: string
  type: "INCOME" | "EXPENSE"
  date: string
}

interface TransactionFormCardProps {
  onTransactionAdded: () => void
}

export function TransactionFormCard({ onTransactionAdded }: TransactionFormCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      amount: "",
      description: "",
      type: undefined,
      date: new Date().toISOString().split('T')[0],
    },
  })

  const selectedType = watch("type")

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      createTransactionSchema.parse(data)

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create transaction")
      }

      reset()
      onTransactionAdded()
    } catch (error) {
      console.error("Error creating transaction:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to create transaction")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(15,23,42,0.04)] p-6 md:p-7 transition-all duration-200 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 tracking-tight mb-1">
          Add Transaction
        </h2>
        <p className="text-sm text-gray-500">
          Quickly log any income or expense.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Transaction type chips */}
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-[0.12em] font-semibold text-gray-600">
            Type
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedType === "INCOME"
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                value="INCOME"
                {...register("type")}
                className="sr-only"
                disabled={isSubmitting}
              />
              <ArrowUpRight className={`h-4 w-4 ${selectedType === "INCOME" ? "text-emerald-600" : "text-gray-400"}`} />
              <span className={`text-sm font-medium ${selectedType === "INCOME" ? "text-emerald-700" : "text-gray-600"}`}>
                Income
              </span>
            </label>

            <label
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedType === "EXPENSE"
                  ? "border-rose-500 bg-rose-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                value="EXPENSE"
                {...register("type")}
                className="sr-only"
                disabled={isSubmitting}
              />
              <ArrowDownRight className={`h-4 w-4 ${selectedType === "EXPENSE" ? "text-rose-500" : "text-gray-400"}`} />
              <span className={`text-sm font-medium ${selectedType === "EXPENSE" ? "text-rose-600" : "text-gray-600"}`}>
                Expense
              </span>
            </label>
          </div>
          {errors.type && (
            <p className="text-xs text-rose-500 mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-xs uppercase tracking-[0.12em] font-semibold text-gray-600">
            Amount
          </Label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -trangray-y-1/2 text-gray-400">
              <DollarSign className="h-4.5 w-4.5" />
            </div>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount")}
              disabled={isSubmitting}
              className="h-12 rounded-2xl border-gray-200 bg-white pl-11 pr-4 text-sm placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-gray-400/30"
            />
          </div>
          {errors.amount && (
            <p className="text-xs text-rose-500">{errors.amount.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-xs uppercase tracking-[0.12em] font-semibold text-gray-600">
            Description
          </Label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -trangray-y-1/2 text-gray-400">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <Input
              id="description"
              type="text"
              placeholder="What was this for?"
              {...register("description")}
              disabled={isSubmitting}
              className="h-12 rounded-2xl border-gray-200 bg-white pl-11 pr-4 text-sm placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-gray-400/30"
            />
          </div>
          {errors.description && (
            <p className="text-xs text-rose-500">{errors.description.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date" className="text-xs uppercase tracking-[0.12em] font-semibold text-gray-600">
            Date
          </Label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -trangray-y-1/2 text-gray-400">
              <Calendar className="h-4.5 w-4.5" />
            </div>
            <Input
              id="date"
              type="date"
              {...register("date")}
              disabled={isSubmitting}
              className="h-12 rounded-2xl border-gray-200 bg-white pl-11 pr-4 text-sm placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-gray-400/30"
            />
          </div>
          {errors.date && (
            <p className="text-xs text-rose-500">{errors.date.message}</p>
          )}
        </div>

        {/* Error message */}
        {submitError && (
          <div className="rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-600">
            {submitError}
          </div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-full bg-gradient-to-b from-gray-800 to-gray-700 text-white shadow-sm hover:from-gray-800 hover:to-gray-700 disabled:opacity-50 transition-all duration-200 cursor-pointer"
        >
          {isSubmitting ? "Adding..." : "Add Transaction"}
        </Button>
      </form>
    </div>
  )
}
