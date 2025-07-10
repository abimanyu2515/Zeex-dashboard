import { Outlet } from "react-router-dom"
import AdminSideBar from "../Components/AdminSideBar"
import { useState } from "react"
import Header from "../Components/Header"


const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex">
        <div className="fixed h-screen z-50"> 
            <AdminSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        <div className={`${isOpen ? 'ml-60' : 'ml-16'} flex-1 min-h-screen p-3 bg-[#F5F5F5] transition-all duration-200`}>
          <Header />
          <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout