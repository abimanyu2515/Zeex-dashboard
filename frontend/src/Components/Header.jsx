import { useNavigate } from "react-router-dom"
import avatar from '../media/user.png'
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
 
const Header = () => {

    const navigate = useNavigate();
    const { loaded } = useContext(AuthContext)

    const handleLogOut = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    const user = JSON.parse(localStorage.getItem('user'))

  return (
    <>
        <div className="flex justify-between mt-3 mx-2">
            <div className="p-0 max-sm:mt-10">
                <input className="border-1 rounded-sm text-sm p-2" type="text" placeholder="Search" />
            </div>

            <div>
                <Menu as='div' className='relative inline-block text-left'>
                    <MenuButton className="relative rounded-3xl hover:bg-gray-400 hover:cursor-pointer">
                        <img src={avatar} width={40} alt="" />
                    </MenuButton>

                    <MenuItems className='absolute top-12 right-0 origin-top-right bg-blue-300 p-5 rounded-2xl text-sm focus:outline-none'>
                        <div>
                            <span>{user?.email}</span><br />
                            <br />

                            <MenuItem>
                                <button className="w-full bg-white p-2 rounded-lg hover:bg-gray-200 hover:cursor-pointer
                                " onClick={handleLogOut}>LOGOUT</button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    </>
  )
}

export default Header