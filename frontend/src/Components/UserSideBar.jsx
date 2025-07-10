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
      Map,
      PanelLeftClose,
      PanelLeftOpen,
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
