export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-[1170px] mx-auto px-4 py-16">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} Exclusive. All rights reserved.</p>
      </div>
    </footer>
  )
}