import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Login from './pages/Login/Login';  
import ProtectedRoute from './components/guards/ProtectedRoute';
import Home from './pages/Home/Home';
import FarmersPage from './pages/FarmerPage/index';
import FarmsPage from './pages/FarmPage'; 
import HarvestsPage from './pages/Harvest/index';
import DashboardPage from './pages/Dashboard';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/farmers" element={<ProtectedRoute />}>
          <Route index element={<FarmersPage />} />
        </Route>
        <Route path="/farms" element={<ProtectedRoute />}>
          <Route index element={<FarmsPage />} />
        </Route>
        <Route path="/harvests" element={<ProtectedRoute />}>
          <Route index element={<HarvestsPage />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
