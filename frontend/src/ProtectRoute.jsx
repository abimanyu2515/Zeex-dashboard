import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

const ProtectRoute = ({children, allowedRoles}) => {
  const token = localStorage.getItem('token')
  const location = useLocation()

  // If no token, redirect to login immediately
  if (!token) {
    return <Navigate to='/' />
  }

  // Validate token and get user info
  let decoded;
  try {
    decoded = jwtDecode(token)
    const now = Math.floor(Date.now() / 1000)
    
    // Check if token is expired
    if (decoded.exp < now) {
      localStorage.removeItem('token')
      return <Navigate to="/" />
    }
  } catch(err) {
    localStorage.removeItem('token')
    return <Navigate to="/" />
  }

  // Set up token expiration monitoring only once
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const currentToken = localStorage.getItem('token')
        if (!currentToken) {
          window.location.href = '/'
          return
        }
        
        const decodedToken = jwtDecode(currentToken)
        const currTime = Math.floor(Date.now() / 1000)
        
        if (decodedToken.exp < currTime) {
          localStorage.removeItem('token')
          window.location.href = '/'
        }
      } catch(err) {
        localStorage.removeItem('token')
        window.location.href = '/'
      }
    }, 5000)

    return () => clearInterval(interval)
  }, []) // Empty dependency array - only runs once

  // Role-based access control
  const userRole = decoded.role;
  
  // If user doesn't have required role for this route
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />
  }

  // Role-based route redirection
  // If admin tries to access user routes, redirect to admin area
  if (userRole === 'admin' && location.pathname.startsWith('/user')) {
    return <Navigate to="/admin/dashboard" />
  }
  
  // If non-admin tries to access admin routes, redirect to user area
  if (userRole !== 'admin' && location.pathname.startsWith('/admin')) {
    return <Navigate to="/user/dashboard" />
  }

  return children
}

export default ProtectRoute