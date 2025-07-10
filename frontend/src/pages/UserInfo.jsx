import { useEffect, useState } from "react"

const UserInfo = () => {
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState([])
  const token = localStorage.getItem('token') 

  const fetchUsers = async () => {
    try{
      const res = await fetch('http://localhost:8000/admin/get_all_users', {
        method: 'GET',
        headers: {
          Authorization : `Bearer ${token}`
        },
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.detail || 'Unable load the page')
      } else {
        setUsers(data)
      }

    } catch(err) {
      console.log('Error occured: ', err)
      setMessage('ERROR: SOMETHING WENT WRONG')
    }
  }

  const updateStatus = async (userId, status) => {
  try {
    const res = await fetch(`http://localhost:8000/admin/update/${userId}?status=${status}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.detail || 'Error updating status')
    } else {
      alert(data.message)
      fetchUsers()  // Refresh the list
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  const setStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-white bg-green-600'
      case 'rejected': return 'text-white bg-red-600'
      case 'pending': return 'text-white bg-gray-600'
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="m-2.5">
      <div>
        <h1 className="font-bold text-2xl">USERS INFORMATION</h1>
      </div>
      
      {message && <div className="text-center mt-20"><span className="text-2xl font-bold text-red-600">{message}</span></div>}

      <div className={`mt-10 ${message ? 'hidden' : ''}`}>
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-900 text-white text-center">
              <td className="p-3">ID</td>
              <td className="p-3">NAME</td>
              <td className="p-3">EMAIL</td>
              <td className="p-3">STATUS</td>
              <td className="p-3">ROLE</td>
              <td className="p-3">ACTIONS</td>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              return(
              <tr key={user.id} className="text-center bg-blue-100 border-b">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className={`p-3 capitalize ${setStatusColor(user.status)}`}>{user.status}</td>
                <td className="bg- capitalize">{user.role}</td>
                <td className="p-3">
                  {user.status === 'pending' && (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => updateStatus(user.id, 'approved')}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 hover: cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(user.id, 'rejected')}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 hover: cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {user.status === 'approved' && (
                    <button
                      onClick={() => updateStatus(user.id, 'rejected')}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 hover: cursor-pointer"
                    >
                      Reject
                    </button>
                  )}
                  {user.status === 'rejected' && (
                    <button
                      onClick={() => updateStatus(user.id, 'approved')}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 hover: cursor-pointer"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserInfo