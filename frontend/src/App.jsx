import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddDonor from './pages/AddDonor';
import DonorList from './pages/DonorList';
import EditDonor from './pages/EditDonor';
import DonorStats from './pages/DonorStats';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import UserList from './pages/UserList';
import NotAuthorized from './pages/NotAuthorized';
import AddRequest from './pages/AddRequest';
import RequestForm from './pages/RequestForm';

function App() {
  return (
    <AuthProvider>
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          backgroundImage: 'url("/images/backgroundimage.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/add-donor" element={<PrivateRoute><AddDonor /></PrivateRoute>} />
          <Route path="/donors" element={<PrivateRoute><DonorList /></PrivateRoute>} />
          <Route path="/donors/edit/:id" element={<PrivateRoute><EditDonor /></PrivateRoute>} />
          <Route path="/stats" element={<PrivateRoute><DonorStats /></PrivateRoute>} />
          <Route path="/users" element={<AdminRoute><UserList /></AdminRoute>} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/add-request" element={<PrivateRoute><AddRequest /></PrivateRoute>} />
          <Route path="/request-blood" element={<PrivateRoute><RequestForm /></PrivateRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
