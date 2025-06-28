import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FilmIcon } from '@heroicons/react/24/solid';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
 const provider = new GoogleAuthProvider();
  const router = useRouter();
const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
    alert("Logged in successfully!");
    router.push('/?loggedin=true');
  } catch (err) {
    console.error(err);
    alert("Login failed.");
  }
};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-gray-900 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md text-white relative overflow-hidden">
        
        {/* Glowing backdrop effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-red-900/30 rounded-2xl blur-2xl z-0" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          {/* Logo/Header */}
          <div className="flex items-center space-x-2">
            <FilmIcon className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-extrabold text-white">RedCurtain</h1>
          </div>

          <h2 className="text-xl font-semibold">🔐 Log in to Continue</h2>
          <p className="text-gray-400 text-sm">
            Please sign in to book movie tickets and access your dashboard.
          </p>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 bg-white text-black w-full py-2.5 rounded-md hover:bg-gray-200 transition font-medium text-sm"
          >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
