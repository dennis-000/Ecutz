// Importing from pages
import Home from '../pages/Home'
import Services from '../pages/Services'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Barbers from '../pages/Barbers/Barbers'
import BarbersDetails from '../pages/Barbers/BarbersDetails'
import Aboutus from '../pages/Aboutus'
import MyAccount from '../Dashboard/User-account/MyAccount'
import Dashboard from '../Dashboard/Barber-account/Dashboard'
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/barbers" element={<Barbers />} />
    <Route path="/barbers/:id" element={<BarbersDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signup />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/services" element={<Services />} />
    <Route path="/aboutus" element={<Aboutus />} />

    <Route path="/users/profile/me" element={
      <ProtectedRoute allowedRoles={['user']} >
        <MyAccount />
      </ProtectedRoute> } />

    <Route path="/barber/profile/me" element={
      <ProtectedRoute allowedRoles={['barber']}>
        <Dashboard />
      </ProtectedRoute>} />
    

  </Routes>
}

export default Routers