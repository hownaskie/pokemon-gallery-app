import React, { useState } from 'react'
import { Link, useNavigate, useRouter } from '@tanstack/react-router'
import { LogOut, Menu } from 'lucide-react'
import supabase from '@/lib/supabaseClient'
import { useAuth } from '@/contexts/AuthContext'
import { SideDrawer } from './SideDrawer'

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { auth } = useAuth()
  const router = useRouter()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
      return
    }
    router.invalidate()
    navigate({ to: '/login', replace: true })
  }

  return (
    <>
      <header className="bg-white shadow-md border-b-4 border-red-500">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setOpen(true)} className="flex items-center">
              <Menu size={24} />
            </button>
            <Link to="/pokemon" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">PokéDex</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              {auth?.user?.user_metadata.avatar_url ? (
                <img
                  src={auth.user?.user_metadata.avatar_url}
                  alt={auth.user?.user_metadata.full_name}
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                />
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-gray-300"></div>
              )}

              <span className="text-gray-700 font-medium">
                {auth?.user?.user_metadata.full_name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <SideDrawer
        open={open}
        setOpen={setOpen}
        onClickMenuItem={(menu: string) => navigate({ to: '/' + menu })}
      />
    </>
  )
}
