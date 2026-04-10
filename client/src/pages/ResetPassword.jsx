import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const ResetPassword = () => {
    const { token } = useParams()
    const { axios, navigate } = useAppContext()
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters')
            return
        }

        setLoading(true)
        try {
            const { data } = await axios.post('/api/user/reset-password', {
                token,
                newPassword,
            })
            if (data.success) {
                setSuccess(true)
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
                        Reset Password
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Enter your new password below.
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-borderColor shadow-lg p-8">
                    {!success ? (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="w-full">
                                <label className="text-sm text-gray-600 mb-1 block">New Password</label>
                                <input
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    value={newPassword}
                                    placeholder="Minimum 8 characters"
                                    className="border border-gray-200 rounded-lg w-full p-3 mt-1 outline-primary text-sm"
                                    type="password"
                                    required
                                    minLength={8}
                                />
                            </div>

                            <div className="w-full">
                                <label className="text-sm text-gray-600 mb-1 block">Confirm Password</label>
                                <input
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    placeholder="Re-enter your password"
                                    className="border border-gray-200 rounded-lg w-full p-3 mt-1 outline-primary text-sm"
                                    type="password"
                                    required
                                    minLength={8}
                                />
                            </div>

                            <button
                                disabled={loading}
                                className={`w-full py-3 font-medium text-white rounded-xl transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dull cursor-pointer'
                                    }`}
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-6"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">✅</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Password Reset Successful!</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Your password has been updated. You can now login with your new password.
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-primary hover:bg-primary-dull text-white px-8 py-3 rounded-xl font-medium transition-all cursor-pointer"
                            >
                                Go to Login
                            </button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default ResetPassword
