import { Link } from 'react-router-dom'

type ComingSoonProps = {
  page: string
}

export default function ComingSoon({ page }: ComingSoonProps) {
  return (
    <div className="bg-[#F7F7F7] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[520px] bg-white border border-[#DEE2E7] rounded-xl p-8 text-center">

        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-[#EEF3FD] flex items-center justify-center">
          <span className="material-icons text-[#0D6EFD] text-[40px]">
            construction
          </span>
        </div>

        <h1 className="text-2xl font-bold text-[#1C1C1C] mb-3">
          {page} Coming Soon
        </h1>

        <p className="text-sm text-[#8B96A5] leading-relaxed mb-6">
          We're currently working on the {page.toLowerCase()} page.
          It’ll be available very soon.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="bg-[#0D6EFD] hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Back to home
          </Link>

          <Link
            to="/products"
            className="border border-[#DEE2E7] hover:bg-[#F7F7F7] text-[#1C1C1C] text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Browse products
          </Link>
        </div>

      </div>
    </div>
  )
}