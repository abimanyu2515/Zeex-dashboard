import { useState } from "react";
import {
      House,
      UserPlus,
      ChartPie,
      FileVideo2,
      Video,
      FileText,
      CalendarDays,
      CircleHelp,
      ChartColumnIncreasing,
      ChartNoAxesCombined,
      Map  
} from "lucide-react";
import logo from '../media/logo.png'

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return(
        <div className={`fixed top-0 left-0 h-full z-50 bg-white shadow-md overflow-y-scroll max-sm:hidden sm:w-48 lg:w-60`}>
            <aside className='p-3 text-blue-700 transition-all'>

                <img src={logo} className="ml-2 mb-4" width={150} alt="" />

                <nav className={`flex flex-col text-sm p-1 ${isOpen ? 'gap-2' : 'gap-5'} `}>
                    <SidebarItem icon={<House />} label="Dashboard" isOpen={isOpen} />

                    <h3 className={`font-semibold text-orange-600 ${isOpen ? 'block' : 'hidden'}`}>User Data</h3>
                    <SidebarItem icon={<UserPlus />} label="Add Users" isOpen={isOpen} />
                    <SidebarItem icon={<ChartPie />} label="User Chart" isOpen={isOpen} />
                    
                    <h3 className={`font-semibold text-orange-600 ${isOpen ? 'block' : 'hidden'}`}>Camera Management</h3>
                    <SidebarItem icon={<FileVideo2 />} label="Camera Directory" isOpen={isOpen} />
                    <SidebarItem icon={<Video />} label="Manage Files" isOpen={isOpen} />
                    <SidebarItem icon={<FileText />} label="Invoice Balances" isOpen={isOpen} />
                    
                    <h3 className={`font-semibold text-orange-600 ${isOpen ? 'block' : 'hidden'}`}>Pages</h3>
                    <SidebarItem icon={<CalendarDays />} label="Calendar" isOpen={isOpen} />
                    <SidebarItem icon={<CircleHelp />} label="FAQS" isOpen={isOpen} />
                    
                    <h3 className={`font-semibold text-orange-600 ${isOpen ? 'block' : 'hidden'}`}>Charts and Metrics</h3>
                    <SidebarItem icon={<ChartColumnIncreasing />} label="Building Alerts" isOpen={isOpen} />
                    <SidebarItem icon={<ChartNoAxesCombined />} label="Accumalated alerts" isOpen={isOpen} />
                    <SidebarItem icon={<Map />} label="Geography Chart" isOpen={isOpen} />
                </nav>
            </aside>
        </div>
    )
}

const SidebarItem = ({icon, label, isOpen}) => {
    return(
        <div className={`flex items-center gap-3 ${isOpen ? 'p-2' : 'p-0.5'} hover:bg-blue-700 hover:text-white ${isOpen ? 'rounded-4xl' : 'rounded-lg'} transition-colors duration-300 cursor-pointer`}>
            {icon}
            {isOpen &&
                <span>{label}</span> 
            }
        </div>
    )
}

export default SideBar;