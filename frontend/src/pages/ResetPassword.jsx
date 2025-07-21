import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [checkToken, setCheckToken] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)

  const [SearchParams] = useSearchParams()
  const token = SearchParams.get('token')

  useEffect(() => {
    if (!token) {
      setMessage('Invalid reset link')
      setCheckToken(false)
      return
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(`http://localhost:8000/verify-reset-token/${token}`)
        const data = await response.json()

        if (data.valid) {
          setTokenValid(true)
        } else {
          setMessage('Invalid or expired reset link')
        }
      } catch (err) {
        setMessage("Error verifying reset link")
      } finally {
        setCheckToken(false)
      }
    } 
    verifyToken()
  }, [token])

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Passwords don't match")
      return
    }

    if (password.length < 8) {
      setMessage('The password must contain atleast 8 letters')
      return
    }
    setLoading(true)
    setMessage('')

    try {
      
      const res = await fetch('http://localhost:8000/reset-password', {
        method: 'POST', 
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({token, new_password: password})
      })

      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
        setIsSuccess(true)
      } else {
        setMessage(data.detail || 'Something went wrong')
        setIsSuccess(false)
      }
    } catch(err) {
      setMessage('Network Error. Please try again')
    } finally {
      setLoading(false)
    }
  }

  if (checkToken) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-300">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
      </div>
    )
  }

  if (!tokenValid) {
    return (
      <div className="h-screen flex bg-white-300 items-center justify-center">
        <div className="w-full bg-red-100 text-red-600 font-black border max-w-sm p-6 rounded-lg shadow-md text-center">
          <p>{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-300">
      <div className="w-full bg-white border max-w-sm p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-center">Reset Password</h3>

        {message && (
          <div className={`text-center p-3 mb-4 ${isSuccess ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
            {message}
          </div>
        )}

        <form className="mt-4" onSubmit={handleFormSubmit}>
          <span>New Password</span><br />
          <input 
            type="password" 
            value={password}
            className="w-full mt p-2 border rounded" 
            placeholder="Enter new password (min 8 characters)"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <span>Confirm Password</span><br />
          <input 
            type="password" 
            value={confirmPassword} 
            className="w-full mt p-2 border rounded" 
            placeholder='Re-enter the password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <br />
          <button
              type='submit'
              disabled={loading}
              className={`w-full text-white py-2 px-4 border-2 rounded disabled:opacity-50 ${loading ? 'bg-blue-300' : 'bg-blue-600 border-blue-600 hover:bg-white hover:text-blue-600 hover:font-bold hover:cursor-pointer'}`}
            >
              {loading ? 'Please Wait...' : 'RESET PASSWORD'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword