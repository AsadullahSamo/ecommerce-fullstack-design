import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = () => {
    setError('')

    if (!email.trim()) {
      setError('Please enter your email')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setSubscribed(true)
    setEmail('')
  }

  return (
    <div className="bg-[#EFF2F4] rounded-md py-10 px-4 text-center mt-4">
      <h2 className="font-semibold text-[#1C1C1C] text-lg mb-1">
        Subscribe to our newsletter
      </h2>

      <p className="text-sm text-[#8B96A5] mb-5">
        Get daily news on upcoming offers from many suppliers all over the
        world
      </p>

      <div className="max-w-[440px] mx-auto">
        <div className="flex items-stretch">
          <div className="flex items-center flex-1 bg-white border border-[#DEE2E7] rounded-l-md px-3 gap-2">
            <span className="material-icons text-[#8B96A5] text-[18px]">
              mail_outline
            </span>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              disabled={subscribed}
              className="flex-1 py-2.5 text-sm outline-none placeholder:text-[#8B96A5] disabled:bg-white"
            />
          </div>

          <button
            onClick={handleSubscribe}
            disabled={subscribed}
            className={`text-sm font-medium px-6 py-2.5 rounded-r-md transition-colors duration-200 ${
              subscribed
                ? 'bg-green-500 text-white cursor-default'
                : 'bg-[#0D6EFD] hover:bg-blue-700 text-white'
            }`}
          >
            {subscribed ? 'Subscribed ✓' : 'Subscribe'}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
        )}

        {subscribed && (
          <p className="text-green-600 text-sm mt-3">
            Thank you for subscribing to our newsletter!
          </p>
        )}
      </div>
    </div>
  )
}