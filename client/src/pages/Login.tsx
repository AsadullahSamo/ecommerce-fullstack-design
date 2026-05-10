import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiEye, FiEyeOff } from 'react-icons/fi' // add this

export default function Login() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = (location.state as { from?: string })?.from || '/'

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] px-4">
      <div className="bg-white rounded-xl border border-[#DEE2E7] p-8 w-full max-w-[400px]">
        <h1 className="text-2xl font-bold text-[#1C1C1C] mb-1 text-center">Sign in</h1>
        

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1C1C1C] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0D6EFD] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C1C1C] mb-1.5">Password</label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full border border-[#DEE2E7] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#0D6EFD] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-[#8B96A5] hover:text-[#1C1C1C]"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* <div className="mt-4 text-center">
          <Link to="/products" className="text-xs text-[#8B96A5] hover:text-[#0D6EFD]">
            Continue as guest
          </Link>
        </div> */}
        <p className="text-sm text-[#8B96A5] mb-6 text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#0D6EFD] hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}