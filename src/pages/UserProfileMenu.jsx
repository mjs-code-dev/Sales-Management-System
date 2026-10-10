import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const UserProfileMenu = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-gray-700"> {usuario?.nombre}</span>
      <button 
        onClick={handleLogout}
        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
};
