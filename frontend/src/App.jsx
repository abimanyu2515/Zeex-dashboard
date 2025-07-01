import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import ProtectRoute from './ProtectRoute'
import AdminLayout from './layouts/AdminLayout'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import NotAuthorized from './pages/NotAuthorized'
import AddUsers from './pages/AddUsers'
import ContactInfo from './pages/UserInfo'
import UsersChart from './pages/UsersChart'
import CamDirectory from './pages/CamDirectory'
import VideoFiles from './pages/VideoFiles'
import Invoices from './pages/Invoices'
import Calendar from './pages/Calendar'
import Faqs from './pages/Faqs'
import AccumalatedAlerts from './pages/AccumalatedAlerts'
import BuildingAlerts from './pages/BuildingAlerts'
import GeoAlerts from './pages/GeoAlerts'
import UserInfo from './pages/UserInfo'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route path="/admin" element={
        <ProtectRoute allowedRoles={['admin']}>
          <AdminLayout />
        </ProtectRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="add-users" element={<AddUsers />} />
        <Route path='users-info' element={<UserInfo />} />
        <Route path='users-manage' element={<UsersChart />} />
        <Route path='cam-directory' element={<CamDirectory />} />
        <Route path='manage-files' element={<VideoFiles />} />
        <Route path='invoices' element={<Invoices />} />
        <Route path='calendar' element={<Calendar />} />
        <Route path='faqs' element={<Faqs />} />
        <Route path='accumalated-alerts' element={<AccumalatedAlerts />} />
        <Route path='building-alerts' element={<BuildingAlerts />} />
        <Route path='geo-alerts' element={<GeoAlerts />} />
      </Route>

      <Route path="/user/dashboard" element={
        <ProtectRoute allowedRoles={['admin', 'viewer']}>
          <UserDashboard />
        </ProtectRoute>
      } />

      <Route path="*" element={<NotAuthorized />} />
    </Routes>
  )
}

export default App
