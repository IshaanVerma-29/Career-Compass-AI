"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { authenticate } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const result = await authenticate(email, password);
            
            if (result.success) {
                if (result.needsOnboarding) {
                    router.push('/onboarding');
                } else {
                    router.push('/dashboard');
                }
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'>
            <div className='bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-white/20'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-white mb-2'>
                        Sign In
                    </h1>
                    <p className='text-gray-300'>Welcome to Career Compass</p>
                </div>
                
                <form onSubmit={handleSubmit} className='space-y-6'>
                    {error && (
                        <div className='p-3 bg-red-500/20 rounded-lg border border-red-400/30'>
                            <p className='text-red-200 text-sm text-center'>{error}</p>
                        </div>
                    )}
                    
                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-200 mb-2'>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm'
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-200 mb-2'>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm'
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className='w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                
                <div className='mt-6 text-center'>
                    <p className='text-gray-300 text-sm'>
                        Don't have an account? 
                        <button 
                            onClick={() => router.push('/register')}
                            className='text-purple-400 hover:text-purple-300 ml-1 underline'
                        >
                            Register Now
                        </button>
                    </p>
                    <p className='text-gray-300 text-sm mt-2'>
                        Or 
                        <button 
                            onClick={() => router.push('/')}
                            className='text-purple-400 hover:text-purple-300 ml-1 underline'
                        >
                            Continue as Guest
                        </button>
                    </p>
                </div>
                
                <div className='mt-4 p-3 bg-blue-500/20 rounded-lg border border-blue-400/30'>
                    <p className='text-blue-200 text-xs text-center'>
                        💡 Use the registration form to create an account first
                    </p>
                </div>
            </div>
        </div>
    );
}