import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import CategoriasPage from './pages/CategoriasPage'
import ClientesPage from './pages/ClientesPage'
import PedidosPage from './pages/PedidosPage'
import ProductosPage from './pages/ProductosPage'
import HomePage from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { AuthContext, AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.css'
import { UserProfileMenu } from './pages/UserProfileMenu'
import RegisterPage from './pages/RegisterPage'
function AppContent() {
  const { usuario } = useContext(AuthContext)

  const obtenerClaseLink = ({ isActive }) =>
    isActive
      ? 'w-full block text-left bg-[#4A5B6A] text-white font-bold p-3'
      : 'w-full block text-left text-gray-200 hover:bg-[#728495] p-3'

  return (
    <div className='layout-contenedor flex'>
      {/* 1. Menú lateral (Sidebar) */}
      {usuario && (
        <nav className="w-64 bg-[#263A47] min-h-screen flex flex-col">
          <h2 className="text-white text-xl font-bold pt-4 ml-4 mb-4">Mi panel</h2>

          <NavLink to="/" className={obtenerClaseLink}>
            Inicio
          </NavLink>

          <NavLink to="/categorias" className={obtenerClaseLink}>
            Categorías
          </NavLink>

          <NavLink to="/clientes" className={obtenerClaseLink}>
            Clientes
          </NavLink>

          <NavLink to="/productos" className={obtenerClaseLink}>
            Productos
          </NavLink>

          <NavLink to="/pedidos" className={obtenerClaseLink}>
            Pedidos
          </NavLink>
        </nav>
      )}

      {/* 2. Contenido principal con el Header arriba a la derecha */}
      <main className='contenido-principal flex-1 p-6'>
        {usuario && (
          <header className="flex justify-end mb-4">
            <UserProfileMenu />
          </header>
        )}

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/categorias" element={<ProtectedRoute><CategoriasPage /></ProtectedRoute>} />
          <Route path="/clientes" element={<ProtectedRoute><ClientesPage /></ProtectedRoute>} />
          <Route path="/productos" element={<ProtectedRoute><ProductosPage /></ProtectedRoute>} />
          <Route path="/pedidos" element={<ProtectedRoute><PedidosPage /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App