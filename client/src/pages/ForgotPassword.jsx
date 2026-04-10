import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const ForgotPassword = () => {
    const { axios, navigate } = useAppContext()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post('/api/user/forgot-password', { email })
            if (data.success) {
                setSent(true)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-light px-6 md:px-16 lg:px-24 xl:px-32 py-12 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto w-full"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                        Forgot Password?
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-borderColor shadow-lg p-8">
                    {!sent ? (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="w-full">
                                <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="Enter your registered email"
                                    className="border border-gray-200 rounded-lg w-full p-3 mt-1 outline-primary text-sm"
                                    type="email"
                                    required
                                />
                            </div>

                            <button
                                disabled={loading}
                                className={`w-full py-3 font-medium text-white rounded-xl transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dull cursor-pointer'
                                    }`}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>

                            <p className="text-center text-sm text-gray-500">
                                Remember your password?{' '}
                                <span
                                    onClick={() => navigate('/login')}
                                    className="text-primary cursor-pointer font-medium"
                                >
                                    Back to Login
                                </span>
                            </p>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-6"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📧</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Check Your Email</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                We've sent a password reset link to <strong>{email}</strong>. 
                                The link will expire in 15 minutes.
                            </p>

                            <button
                                onClick={() => { setSent(false); setEmail('') }}
                                className="text-primary cursor-pointer text-sm font-medium hover:underline"
                            >
                                Didn't receive it? Try again
                            </button>

                            <div className="mt-4">
                                <span
                                    onClick={() => navigate('/login')}
                                    className="text-gray-500 cursor-pointer text-sm hover:text-primary"
                                >
                                    ← Back to Login
                                </span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default ForgotPassword
