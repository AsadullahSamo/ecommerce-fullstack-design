import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Props {
  adminOnly?: boolean
}

export default function ProtectedRoute({ adminOnly = false }: Props) {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
      <div className="w-8 h-8 border-4 border-[#0D6EFD] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />

  return <Outlet />
}