import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import HomePage from "./pages/Home/Home";
import DashboardPage from "./pages/Dashboard/Dashboard.jsx";
import CreneauxPage from "./pages/creneaux/CreneauxPage.jsx";
import Reservation from "./pages/reservation/Reservation.jsx";
import Success from "./pages/success/Success";
import ProtectedRoute from './routes/ProtectedRoute';


import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/HomePage" />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      <Route path="/reservation/:terrainId" element={
        <ProtectedRoute>
          <CreneauxPage />
        </ProtectedRoute>
      } />
      <Route path="/mes-reservations" element={
        <ProtectedRoute>
          <Reservation />
        </ProtectedRoute>
      } />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;
