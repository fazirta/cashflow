interface SummaryCardProps {
  label: string
  value: string
  icon: React.ReactNode
  iconBgColor: string
  iconColor: string
  valueColor: string
}

export function SummaryCard({
  label,
  value,
  icon,
  iconBgColor,
  iconColor,
  valueColor,
}: SummaryCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgba(15,23,42,0.04)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-full ${iconBgColor} ${iconColor} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-xs uppercase tracking-[0.12em] font-semibold text-slate-400 mb-2">
        {label}
      </p>
      <p className={`text-2xl md:text-3xl font-semibold ${valueColor}`}>
        {value}
      </p>
      <p className="text-xs text-slate-400 mt-1.5">All time</p>
    </div>
  )
}
