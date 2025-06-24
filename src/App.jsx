import { Routes, Route , Navigate} from "react-router-dom";
import LoginForm from "./components/auth/loginForm";
import RegisterForm from "./components/auth/registerForm";
import HomePage from "./pages/Home/Home";
import DashboardPage from "./pages/Dashboard";
import CreneauxPage from "./pages/CreneauxPage.jsx" ;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/HomePage" />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/reservation/:terrainId" element={<CreneauxPage />} />
    </Routes>
  );
}

export default App;

