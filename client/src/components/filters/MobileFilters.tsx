type Props = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function MobileFilters({ open, onClose, children }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute left-0 top-0 h-full w-[85%] max-w-[340px] bg-white overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between">
          <h2 className="font-semibold">Filters</h2>
          <button onClick={onClose}>
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="px-4 py-3">{children}</div>
      </div>
    </div>
  )
}