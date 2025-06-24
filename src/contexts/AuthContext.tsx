import { createContext, useContext, useEffect, useState } from 'react'
import type React from 'react'
import type { Session } from '@supabase/supabase-js'
import supabase from '@/lib/supabaseClient'

export interface AuthContextType {
  auth: Session | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<Session | null>(null)

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('pokemon-app-user')
    if (storedUser) {
      try {
        setAuth(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('pokemon-app-user')
      }
    }
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setAuth(data.session)
        localStorage.setItem(
          'pokemon-app-user',
          JSON.stringify({
            session: data.session,
          }),
        )
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        console.log('Auth event:', _event, newSession)
        if (_event === 'SIGNED_OUT') {
          setAuth(null)
          localStorage.removeItem('pokemon-app-user')
        }

        if (_event === 'TOKEN_REFRESHED') {
          setAuth(newSession)
          localStorage.setItem('pokemon-app-user', JSON.stringify(newSession))
        }
      },
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
