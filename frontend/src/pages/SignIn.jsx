import { useState } from 'react'
import '../animateBg.css'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const SignIn = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const url = isSignup ? 'http://localhost:8000/signup' : 'http://localhost:8000/token'
    const body = isSignup
      ? JSON.stringify({ email, name, password })
      : new URLSearchParams([
          ['username', email],
          ['password', password]
        ])

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': isSignup ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        body: body
      })

      const data = await res.json()
      console.log('Response:', data)

      if (!res.ok) {
        setMessage(data.detail || 'Something went wrong')
      } else {
        const token = data.access_token || ''
        localStorage.setItem('isLoggedIn', 'true')
        if (token) { 
          localStorage.setItem('token', token) 
          
          const decoded = jwtDecode(token)
          localStorage.setItem('user', JSON.stringify(decoded))
        }
        setMessage(isSignup ? 'Signed Up Successfully' : 'Signed In Successfully')
        const role = data.role || 'viewer'
        const dashBoardPath = role === 'admin' ? '/admin/dashboard' : '/user/dashboard'
        setTimeout(() => navigate(dashBoardPath), 1000)
      }
    } catch (err) {
      console.error('Error:', err)
      setMessage('Network Error')
    } finally {
      setLoading(false)
    }
  }


  return (
    <form onSubmit={handleSubmit} className='h-screen flex bg-gray-300 max-[425px]:p-2 items-center justify-center transition-all'>
      <div className='w-full max-w-sm p-2 border-1 rounded-lg shadow-md bg-white'>
        <div className='flex p-3 text-center justify-around'>
          <div className='w-full'>
            <button
              type='button'
              className={`w-full pb-2 hover:cursor-pointer transition-all ${isSignup ? '' : 'border-b-3 border-blue-600'}`}
              onClick={() => setIsSignup(false)}
            >
              Sign In
            </button>
          </div>
          <div className='w-full'>
            <button
              type='button'
              className={`w-full pb-2 hover:cursor-pointer transition-all ${isSignup ? 'border-b-3 border-blue-600' : ''}`}
              onClick={() => setIsSignup(true)}
            >
              Sign Up
            </button>
          </div>
        </div>

        {message && <p className="text-center text-md font-semibold text-red-600 my-5">{message.toUpperCase()}</p>}

        <div className='mt-4'>
          <h4 className='mt-0 mb-2'>Email</h4>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-1 p-1.5 w-full rounded-sm'
            placeholder='some@example.com'
            required
          />
          <br /><br />
        </div>

        {isSignup && (
          <div>
            <h4 className='mb-2'>Name</h4>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border-1 p-1.5 w-full rounded-sm'
              placeholder='Your Fullname'
              required
            />
            <br /><br />
          </div>
        )}

        <div className='flex mb-2 justify-between'>
          <h4 className=''>Password</h4>
          <button
            type='button'
            className='text-blue-500 right-0 hover:text-blue-700 hover:cursor-pointer'
          >
            <span>{isSignup ? '' : 'Forgot Password ?'}</span>
          </button>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border-1 p-1.5 w-full rounded-sm'
          placeholder='Enter the password (min 8 characters)'
          required
        />
        <br /><br />
        <button
          type='submit'
          disabled={loading}
          className='bg-blue-600 w-full rounded-sm text-white hover:bg-blue-700 hover:cursor-pointer hover:font-bold py-2 px-5 disabled:opacity-50'
        >
          {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Sign In'}
        </button>

        <div className='flex mt-3 justify-center text-sm mx-auto'>
          <span>{isSignup ? "Have an account ?" : "Don't have an account?"}</span>
          <button
            type='button'
            className='ml-1 text-blue-500 hover:cursor-pointer transition-all'
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Sign in' : 'Sign Up'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default SignIn