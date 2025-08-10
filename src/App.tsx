import { Route, Routes } from 'react-router-dom'
import GlobalStyles from './GlobalStyles'
import Login from './pages/Login/Login'
import ProtectedRoute from './components/guards/ProtectedRoute'
import Home from './pages/Home/Home'


function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
