import {
      House,
<<<<<<< HEAD
=======
      UserPlus,
      ChartPie,
>>>>>>> fc3b24a (Your message about what you changed)
      FileVideo2,
      Video,
      FileText,
      CalendarDays,
      CircleHelp,
      ChartColumnIncreasing,
      ChartNoAxesCombined,
      Map,
      PanelLeftClose,
      PanelLeftOpen,
<<<<<<< HEAD
} from "lucide-react";
// import logo from '../media/logo.png'

const SideBar = ({isOpen, setIsOpen}) => {
    const user = JSON.parse(localStorage.getItem('user'))

    return(
        <div className={`fixed top-0 left-0 h-full flex flex-col shadow-lg z-50 max-sm:hidden transition-all duration-100 ${isOpen ? 'bg-white w-58' : 'w-16'}`}>

            <div className={`${isOpen ? 'ml-2' : 'ml-3.5'}`}>
                <button onClick={() => setIsOpen(!isOpen)} className={` ${isOpen ? 'mt-4' : 'my-4'} p-1 rounded-md hover:cursor-pointer text-red-700 hover:bg-red-700 hover:text-white`}>
                    {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
                </button>
            </div>
        
            {isOpen && <div className="text-center shadow-sm pb-2"> <strong>{user.name}</strong> <br /> <span>{user.role}</span> </div>}
            
            <div className={`flex-grow overflow-y-auto p-2 text-blue-700 ${isOpen ? 'shadow-md' : 'hidden'}`}>
                <nav className="flex flex-col text-sm gap-2">
                    <SidebarItem icon={<House />} label="Dashboard" isOpen={isOpen} />
                    {/* <h3 className={`font-semibold text-orange-600 ${isOpen ? 'block' : 'hidden'}`}>User Data</h3>
                    <SidebarItem icon={<UserPlus />} label="Add Users" isOpen={isOpen} />
                    <SidebarItem icon={<ChartPie />} label="User Chart" isOpen={isOpen} /> */}
                    
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
            </div>
        </div>
    )
}

const SidebarItem = ({icon, label, isOpen}) => {
    return(
        <div className={`flex items-center p-2 gap-3 hover:bg-blue-700 hover:text-white ${isOpen ? 'rounded-lg' : 'rounded-md justify-center'} transition-all duration-300 cursor-pointer`}>
            {icon}
            {isOpen &&
                <span>{label}</span> 
            }
        </div>
    )
}

export default SideBar;
=======
      Contact,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navGroups = [
    {
        title:'',
        items: [
            {label: 'Dashboard', icon: <House />, path: '/user/dashboard'}
        ]
    },

    {
        title: 'Camera Management',
        items: [
            {label: 'Camera Directory', icon: <FileVideo2 />, path: '/user/cam-directory'},
            {label: 'Manage Files', icon: <Video />, path: '/user/manage-files'},
            {label: 'Invoice Balances', icon: <FileText />, path: '/user/invoices'}
        ]
    },

    {
        title: 'Pages',
        items: [
            {label: 'Calendar', icon: <CalendarDays />, path: '/user/calendar'},
            {label: 'FAQs', icon: <CircleHelp />, path: '/user/faqs'},
        ]
    },

    {
        title: 'Charts & Metrics',
        items: [
            {label: 'Accumalated Alerts', icon: <ChartNoAxesCombined />, path: '/user/accumalated-alerts'},
            {label: 'Building Alerts', icon: <ChartColumnIncreasing />, path: '/user/building-alerts'},
            {label: 'Geography Alerts', icon: <Map />, path: '/user/geo-alerts'}
        ]
    }
]

const SideBar = ({isOpen, setIsOpen}) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const location = useLocation()

  const SidebarSection = ({title, items}) => {
    return(
        <div>
        {isOpen && <h3 className="my-2 text-orange-600">{title}</h3>}
        {items.map(({icon, label, path}) =>{
            const isActive = location.pathname === path
            return(
                <div className={`flex items-center gap-3 cursor-pointer p-2 my-2 rounded-md text-sm text-blue-700 hover:bg-blue-100 hover:font-bold transition-colors duration-75 ${isActive ? 'bg-blue-100 font-semibold' : ''} ${!isOpen ? 'justify-center' : ''}`}
                key={path}
                title={!isOpen ? label : ''}
                onClick={() => navigate(path)}
                >
                        {icon}
                        {isOpen && <span>{label}</span>}
                </div>
            )
        })}
    </div>
    )
  }

  return (
    <div className={`top-0 left-0 flex flex-col h-screen shadow transition-all ease-in-out duration-200 ${isOpen ? 'w-60 bg-white' : 'w-16'}`}>
        <div className={`${isOpen ? 'ml-2 mt-4' : 'my-6 ml-3.5'} transition-all ease-in-out`}>
            <button onClick={() => setIsOpen(!isOpen)} className='p-1 rounded-md hover:cursor-pointer text-red-700 hover:bg-red-700 hover:text-white'>
                {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
            </button>
        </div>
        
            {isOpen && <div className="text-center shadow-sm pb-2"> <strong>{user.name}</strong> <br /> <span>{user.role}</span> </div>}

        <div className={`p-2 ${isOpen ? 'overflow-y-auto' : 'hidden'}`}>
            <nav className="mt-4 text-md items-center">
                {navGroups.map(group => (
                    <SidebarSection key={group.title} title={group.title} items={group.items} />
                ))}
            </nav>
        </div>
    </div>
  )
}

export default SideBar
>>>>>>> fc3b24a (Your message about what you changed)
