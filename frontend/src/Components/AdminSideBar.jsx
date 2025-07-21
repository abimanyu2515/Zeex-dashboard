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
import { useState, useEffect } from "react";

const navGroups = [
  {
    title: '',
    items: [
      { label: 'Dashboard', icon: <House />, path: '/admin/dashboard' }
    ]
  },
  {
    title: 'Users',
    items: [
      { label: 'Add Users', icon: <UserPlus />, path: '/admin/add-users' },
      { label: 'Users Information', icon: <Contact />, path: '/admin/users-info', showNotification: true },
      { label: 'Users Chart', icon: <ChartPie />, path: '/admin/users-manage' }
    ]
  },
  {
    title: 'Camera Management',
    items: [
      { label: 'Camera Directory', icon: <FileVideo2 />, path: '/admin/cam-directory' },
      { label: 'Manage Files', icon: <Video />, path: '/admin/manage-files' },
      { label: 'Invoice Balances', icon: <FileText />, path: '/admin/invoices' }
    ]
  },
  {
    title: 'Pages',
    items: [
      { label: 'Calendar', icon: <CalendarDays />, path: '/admin/calendar' },
      { label: 'FAQs', icon: <CircleHelp />, path: '/admin/faqs' },
    ]
  },
  {
    title: 'Charts & Metrics',
    items: [
      { label: 'Accumalated Alerts', icon: <ChartNoAxesCombined />, path: '/admin/accumalated-alerts' },
      { label: 'Building Alerts', icon: <ChartColumnIncreasing />, path: '/admin/building-alerts' },
      { label: 'Geography Alerts', icon: <Map />, path: '/admin/geo-alerts' }
    ]
  }
];

const AdminSideBar = ({ isOpen, setIsOpen }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();
  const [hasPendingUsers, setHasPendingUsers] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const token = localStorage.getItem('token');

  // Detect mobile/tablet view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check for pending users
  const checkPendingUsers = async () => {
    try {
      const res = await fetch('http://localhost:8000/admin/pending-users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (res.ok) {
        const data = await res.json();
        setHasPendingUsers(data.length > 0);
      }
    } catch (err) {
      console.log('Error checking pending users:', err);
    }
  };

  useEffect(() => {
    checkPendingUsers();
    const interval = setInterval(checkPendingUsers, 30000);
    return () => clearInterval(interval);
  }, [token]);

  const SidebarSection = ({ title, items }) => {
    return (
      <div>
        {isOpen && <h3 className="my-2 text-orange-600">{title}</h3>}
        {items.map(({ icon, label, path, showNotification }) => {
          const isActive = location.pathname === path;
          const showDot = showNotification && hasPendingUsers;

          return (
            <div
              className={`flex items-center gap-3 cursor-pointer p-2 my-2 rounded-md text-sm text-blue-700 hover:bg-blue-100 hover:font-bold transition-colors duration-75 
                ${isActive ? 'bg-blue-100 font-semibold' : ''} 
                ${!isOpen ? 'justify-center' : ''} 
                relative`}
              key={path}
              title={!isOpen ? label : ''}
              onClick={() => {
                navigate(path);
                if (isMobileView) setIsOpen(false); // auto close in mobile
              }}
            >
              {icon}
              {isOpen && <span>{label}</span>}

              {showDot && (
                <div className={`absolute w-2 h-2 bg-red-500 rounded-full ${isOpen ? 'right-2 top-2' : 'right-1 top-1'}`}>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping absolute"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobileView && !isOpen && (
        <button onClick={() => setIsOpen(true)} className="p-2 text-red-600 z-50 fixed top-4 left-4 rounded-md">
          <PanelLeftOpen />
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobileView && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div
        className={`z-40 top-0 left-0 flex flex-col shadow transition-all duration-300 ease-in-out bg-white
        ${isOpen ? 'translate-x-0' : isMobileView ? '-translate-x-full' : 'w-16'}
        ${isMobileView ? 'fixed h-screen w-100' : isOpen ? 'w-60 h-screen' : 'w-16 h-screen'}
        `}
      >
        <div className={`${isOpen ? 'ml-2 mt-4' : 'my-6 ml-3.5'} transition-all ease-in-out`}>
          {/* Toggle only visible on desktop */}
          {!isMobileView && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='p-1 rounded-md hover:cursor-pointer text-red-700 hover:bg-red-700 hover:text-white'
            >
              {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
            </button>
          )}
        </div>

        {isOpen && (
          <div className="text-center shadow-sm pb-2">
            <strong>{user.name}</strong> <br />
            <span>{user.role}</span>
          </div>
        )}

        <div className={`p-2 ${isOpen ? 'overflow-y-auto' : 'hidden'}`}>
          <nav className="mt-4 text-md items-center">
            {navGroups.map(group => (
              <SidebarSection key={group.title} title={group.title} items={group.items} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
