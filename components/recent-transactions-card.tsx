interface Transaction {
  id: string
  amount: string
  description: string
  type: "INCOME" | "EXPENSE"
  date: string
  createdAt: string
}

interface RecentTransactionsCardProps {
  transactions: Transaction[]
  isLoading: boolean
}

export function RecentTransactionsCard({ transactions, isLoading }: RecentTransactionsCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(15,23,42,0.04)] p-6 md:p-7 transition-all duration-200 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 tracking-tight mb-1">
          Recent Transactions
        </h2>
        <p className="text-sm text-gray-500">
          Your latest financial activity.
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-900 mb-3"></div>
          <span className="text-sm text-gray-500">Loading transactions...</span>
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium mb-1">No transactions yet</p>
          <p className="text-sm text-gray-400">
            Add your first transaction to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-left text-xs uppercase tracking-wide font-semibold text-gray-400">
                  Date
                </th>
                <th className="pb-3 text-left text-xs uppercase tracking-wide font-semibold text-gray-400">
                  Description
                </th>
                <th className="pb-3 text-right text-xs uppercase tracking-wide font-semibold text-gray-400">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="group hover:bg-gray-50/40 transition-colors">
                  <td className="py-3.5 text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-3.5">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">
                        {transaction.description}
                      </span>
                      <span className={`inline-flex items-center w-fit mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === "INCOME"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-600"
                      }`}>
                        {transaction.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 text-right">
                    <span className={`text-sm font-semibold ${
                      transaction.type === "INCOME"
                        ? "text-emerald-600"
                        : "text-rose-500"
                    }`}>
                      {transaction.type === "INCOME" ? "+" : "-"}$
                      {Number(transaction.amount).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
