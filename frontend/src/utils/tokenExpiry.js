import { jwtDecode } from 'jwt-decode'

const tokenExpiry = () => {
    const token = localStorage.getItem('token')
    if (!token) return false

    try{
        const decoded = jwtDecode(token)
        const exp = decoded.exp
        const now = Math.floor(Date.now() / 1000)
        return exp && exp > now
    } catch (err) {
        console.log('Invalid token', err)
        return false
    }
};

export default tokenExpiry;