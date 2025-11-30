"use client"

import { RecentTransactionsCard } from "@/components/recent-transactions-card"
import { SummaryCard } from "@/components/summary-card"
import { TransactionFormCard } from "@/components/transaction-form-card"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Transaction {
  id: string
  amount: string
  description: string
  type: "INCOME" | "EXPENSE"
  date: string
  createdAt: string
}

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const fetchTransactions = async () => {
    try {
      setIsLoadingTransactions(true)
      const response = await fetch("/api/transactions")
      if (response.ok) {
        const data = await response.json()
        setTransactions(data)
      } else {
        console.error("Failed to fetch transactions")
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setIsLoadingTransactions(false)
    }
  }

  const handleTransactionAdded = () => {
    fetchTransactions()
  }

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login")
    } else if (session?.user) {
      fetchTransactions()
    }
  }, [session, isPending, router])

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-50 to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-gray-700 mx-auto"></div>
          <p className="mt-3 text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  const user = session.user

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const netBalance = totalIncome - totalExpenses

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-50 to-sky-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/dashboard">
              <Image
                src="/logo.png"
                alt="CashFlow"
                width={176}
                height={44}
                className="w-32 mr-5"
              />
            </Link>

            {/* User info & sign out */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ring-1 ring-gray-200">
                  <span className="text-sm font-semibold text-gray-700">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-4 text-sm cursor-pointer"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-10">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-700 tracking-tight">
            Welcome back, {user.name?.split(' ')[0]}
          </h1>
          <p className="mt-2 text-gray-500">
            Track your finances and stay on top of your spending.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard
            label="Total Income"
            value={`$${totalIncome.toFixed(2)}`}
            icon={<ArrowUpRight className="h-5 w-5" />}
            iconBgColor="bg-emerald-50"
            iconColor="text-emerald-600"
            valueColor="text-emerald-600"
          />
          <SummaryCard
            label="Total Expenses"
            value={`$${totalExpenses.toFixed(2)}`}
            icon={<ArrowDownRight className="h-5 w-5" />}
            iconBgColor="bg-rose-50"
            iconColor="text-rose-500"
            valueColor="text-rose-500"
          />
          <SummaryCard
            label="Net Balance"
            value={`$${netBalance.toFixed(2)}`}
            icon={<Wallet className="h-5 w-5" />}
            iconBgColor="bg-sky-50"
            iconColor="text-sky-600"
            valueColor={netBalance >= 0 ? "text-emerald-600" : "text-rose-500"}
          />
        </div>

        {/* Main grid: Form + Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Transaction Form */}
          <TransactionFormCard onTransactionAdded={handleTransactionAdded} />

          {/* Recent Transactions */}
          <RecentTransactionsCard
            transactions={transactions}
            isLoading={isLoadingTransactions}
          />
        </div>
      </main>
    </div>
  )
}
