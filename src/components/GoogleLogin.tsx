import type React from 'react'
import supabase from '@/lib/supabaseClient'

export const GoogleLogin: React.FC = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + "/dashboard",
      }
    })

    if (error) {
      console.error('Error signing in with Google:', error.message)
    }
  }

  return (
    <button
      id="google-signin-btn"
      className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md transition text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
      onClick={handleGoogleLogin}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Sign in with Google</span>
    </button>
  )
}
