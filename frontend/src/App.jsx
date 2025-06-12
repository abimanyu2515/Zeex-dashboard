import React, { useEffect } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import SignIn from './SignIn'
import Comps from './Comps'
import ProtectRoute from './ProtectRoute'
import tokenExpiry from './utils/tokenExpiry'

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    const isValid = tokenExpiry()
    if (!isValid) {
      localStorage.removeItem('token')
      localStorage.removeItem('isLoggedIn')
      navigate('/') // or wherever your login route is
    }
  }, [])

  return (
    <React.Fragment>
        <Routes>
          <Route path='/' element={< SignIn />} />
          <Route path='/dashboard' element={
            <ProtectRoute>
              <Comps />
            </ProtectRoute>
          } />
        </Routes>
    </React.Fragment>
  )
}

export default App
