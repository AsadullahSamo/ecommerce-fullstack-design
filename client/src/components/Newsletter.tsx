import React from 'react'

export default function Newsletter() {
  return (
    <div className="bg-[#EFF2F4] rounded-md py-10 text-center mt-4">
        <h2 className="font-semibold text-[#1C1C1C] text-lg mb-1">Subscribe on our newsletter</h2>
        <p className="text-sm text-[#8B96A5] mb-5">
        Get daily news on upcoming offers from many suppliers all over the world
        </p>
        <div className="flex items-center justify-center max-w-[440px] mx-auto">
        <div className="flex items-center flex-1 bg-white border border-[#DEE2E7] rounded-l-md px-3 gap-2">
            <span className="material-icons text-[#8B96A5] text-[18px]">mail_outline</span>
            <input
            type="email"
            placeholder="Email"
            className="flex-1 py-2.5 text-sm outline-none placeholder:text-[#8B96A5]"
            />
        </div>
        <button className="bg-[#0D6EFD] hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-r-md transition-colors">
            Subscribe
        </button>
        </div>
    </div>
  )
}
