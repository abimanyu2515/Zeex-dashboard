import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('http://localhost:8000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),  
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setSuccess(true)
      } else {
        setMessage(data.detail || 'Something went wrong')
        setSuccess(false)
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-screen flex bg-gray-300 max-[425px]:p-2 items-center justify-center'>
      <div className='w-full max-w-sm p-6 border rounded-lg shadow-md bg-white'>
        <h2 className='text-2xl font-bold text-center mb-6'>Forgot Password</h2>
        
        {message && (
          <div className={`text-center p-3 mb-4 rounded ${
            success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2'>Email Address</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 border rounded focus:ring-blue-500'
                placeholder='Enter your email'
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-blue-600 text-white py-2 px-4 border-2 border-blue-600 rounded hover:bg-white hover:text-blue-600 hover:font-bold hover:cursor-pointer disabled:opacity-50'
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className='text-center'>
            <p className='text-gray-600 mb-4'>
              Please check your email for the password reset link.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword