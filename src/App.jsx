import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home/Home";
import DashboardPage from "./pages/Dashboard";
import CreneauxPage from "./pages/CreneauxPage.jsx";
import Reservation from "./pages/Reservation";
import Success from "./pages/Success";
import PrivateRoute from "./routes/ProtectedRoute.jsx";

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
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      } />
      <Route path="/reservation/:terrainId" element={
        <PrivateRoute>
          <CreneauxPage />
        </PrivateRoute>
      } />
      <Route path="/mes-reservations" element={
        <PrivateRoute>
          <Reservation />
        </PrivateRoute>
      } />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;
