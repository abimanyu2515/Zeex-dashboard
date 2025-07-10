import {useState} from "react"
import { X } from 'lucide-react'
import SimpleSwitch from "../Components/SimpleSwitch"

const AddUsers = () => {
  const [enabled, setEnabled] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  const handleCreateUser = async() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setMessage('Not Authorized anymore')
      return
    }

    const role = enabled ? 'admin' : 'user'
    try {
      const res = await fetch('http://localhost:8000/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({ name: username, email, password, role })
      })

      const data = await res.json()
      if (!res.ok) {
        setToastType('error')
        setToastMessage(
          typeof data.detail === 'string'
            ? data.detail
            : data.detail?.msg || 'Unable to create user'
        )
      } else {
        setToastType('success')
        setToastMessage('User created successfully')
        setUsername('')
        setEmail('')
        setPassword('')
      }
    } catch(err) {
      console.error(err)
      setToastMessage("Network Error")
    }
  }

  // ALERT COMPONENT
  const Toast = ({ type="success", message, onClose }) => {
    const style = {
      'success': 'bg-green-500 text-white border-3 border-green-600',
      'error' : 'bg-red-500 text-white border-3 border-red-600'
    }

    return(
      <div className={`absolute right-5 top-20 px-4 py-2 shadow-md text-sm end ${style[type]}`}>
        <div className="flex items-center">
          <span className="text-lg">{message}</span>
          <button className="ml-5 text-lg hover:cursor-pointer" onClick={onClose}><X width={20} /></button>
        </div>
    </div>
    )
  }
  
  return (
    <div className="m-3.5">
      <div>
          <h1 className="font-bold text-2xl">CREATE USER</h1>
          <h3 className="mt-3">Add a new user</h3>
        {toastMessage && <Toast type={toastType} message={toastMessage} onClose={() => setToastMessage('')} />}
      </div>

      <div className="flex mt-10 gap-5 items-center">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2.5 w-full text-sm" placeholder="Username" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2.5 w-full text-sm" placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2.5 w-full text-sm" placeholder="Password" />
        <SimpleSwitch enabled={enabled} setEnabled={setEnabled} /><span>Admin</span>
      </div>

      <div className="justify-self-center mt-10">
        <button onClick={handleCreateUser} className="bg-green-600 text-white text-sm p-2 rounded-sm cursor-pointer">
          CREATE NEW USER
        </button><br />
        <br />
      </div>
    </div>
  )
}

export default AddUsers