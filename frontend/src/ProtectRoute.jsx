import { Navigate } from "react-router-dom"

const ProtectRoute = ({children}) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    if(!isLoggedIn){
        return <Navigate to='/' />
    }

    return children
}

export default ProtectRoute