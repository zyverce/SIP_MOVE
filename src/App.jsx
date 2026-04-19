import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useOrders } from './context/OrderContext';

// Passenger Pages
import SeatSetup from './pages/Passenger/SeatSetup';
import Menu from './pages/Passenger/Menu';
import Confirmation from './pages/Passenger/Confirmation';

// Staff Pages
import Login from './pages/Staff/Login';
import Dashboard from './pages/Staff/Dashboard';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';

// Unified Layout
import POSDashboard from './pages/POSDashboard';

// Protected Route wrapper for passenger checking seat
const PassengerRoute = ({ children }) => {
  const { seatNumber } = useOrders();
  if (!seatNumber) {
    return <Navigate to="/seat" replace />;
  }
  return children;
};

// Simple staff auth state (just for mock demo)
let isStaffAuthed = false;
export const setStaffAuth = (status) => isStaffAuthed = status;

const StaffRoute = ({ children }) => {
  if (!isStaffAuthed) {
    return <Navigate to="/staff" replace />;
  }
  return children;
};

// Simple admin auth state
let isAdminAuthed = false;
export const setAdminAuth = (status) => isAdminAuthed = status;

const AdminRoute = ({ children }) => {
  if (!isAdminAuthed) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/seat" element={<SeatSetup />} />
        
        {/* Set the main route to be our new layout */}
        <Route path="/" element={<POSDashboard />} />
        
        <Route path="/menu" element={
          <PassengerRoute>
            <Menu />
          </PassengerRoute>
        } />
        
        <Route path="/confirmation" element={
          <PassengerRoute>
            <Confirmation />
          </PassengerRoute>
        } />

        <Route path="/staff" element={<Login />} />
        
        <Route path="/staff/dashboard" element={
          <StaffRoute>
            <Dashboard />
          </StaffRoute>
        } />

        <Route path="/admin" element={<AdminLogin />} />
        
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
