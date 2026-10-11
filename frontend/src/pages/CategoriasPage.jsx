import { useEffect, useState } from "react";
import { 
    obtenerCategorias, 
    crearCategoria, 
    actualizarCategoria, 
    eliminarCategoria 
} from "../services/categoriaService";

function CategoriasPage() {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [idEditando, setIdEditando] = useState(null);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        const data = await obtenerCategorias();
        setCategorias(data || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            alert("Por favor ingresa un nombre para la categoría.");
            return;
        }

        const categoriaData = { nombre: nombre };

        if (idEditando) {
            const actualizado = await actualizarCategoria(idEditando, categoriaData);
            if (actualizado) {
                alert("Categoría actualizada con éxito");
                cancelarEdicion();
                cargarCategorias();
            }
        } else {
            const creado = await crearCategoria(categoriaData);
            if (creado) {
                alert("Categoría creada con éxito");
                setNombre('');
                cargarCategorias();
            }
        }
    };

    const seleccionarParaEditar = (cat) => {
        setIdEditando(cat.idCategoria);
        setNombre(cat.nombre);
    };

    const cancelarEdicion = () => {
        setIdEditando(null);
        setNombre('');
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar esta categoría?")) {
            const exito = await eliminarCategoria(id);
            if (exito) {
                alert("Categoría eliminada");
                cargarCategorias();
            }
        }
    };

    return (
        <div className="">
            <h2 className="text-2xl font-bold text-[#263A47] mb-6">Gestión de categorías</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-[#98A9BE]">
                <h3 className="text-lg font-bold text-[#263A47] mb-4">
                    {idEditando ? ' Editar categoría' : 'Añadir categoría'}
                </h3>
                
                <div className="mb-4">
                    <label className="block text-[#263A47] font-medium mb-2">Nombre:</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        className="w-full p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
                        placeholder="Ej. Electrónica, Ropa..."
                        required
                    />
                </div>

                <div className="flex gap-3">
                    <button 
                        type="submit" 
                        className="px-4 py-2 bg-[#263A47] hover:bg-[#4A5B6A] text-white font-medium rounded-md transition-colors cursor-pointer"
                    >
                        {idEditando ? 'Guardar cambios' : 'Crear categoría'}
                    </button>

                    {idEditando && (
                        <button 
                            type="button" 
                            onClick={cancelarEdicion}
                            className="px-4 py-2 bg-[#728495] hover:bg-[#4A5B6A] text-white font-medium rounded-md transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <h3 className="text-xl font-bold text-[#263A47] mb-4">Categorías Registradas</h3>
            
            <div className="rounded-lg overflow-hidden shadow-md">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#263A47] text-white">
                            <th className="p-3">ID</th>
                            <th className="p-3">Nombre</th>
                            <th className="p-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((cat) => (
                            <tr key={cat.idCategoria} className="bg-white hover:bg-[#98A9BE]/30 transition-colors border-b border-[#98A9BE]/30 text-[#263A47]">
                                <td className="p-3 font-semibold">{cat.idCategoria}</td>
                                <td className="p-3">{cat.nombre}</td>
                                <td className="p-3 text-center">
                                    <button 
                                        onClick={() => seleccionarParaEditar(cat)}
                                        className="mr-2 px-3 py-1 bg-[#4A5B6A] hover:bg-[#263A47] text-white rounded-md text-sm transition-colors cursor-pointer"
                                    >
                                       Editar
                                    </button>
                                    <button 
                                        onClick={() => handleEliminar(cat.idCategoria)}
                                        className="px-3 py-1 bg-[#728495] hover:bg-[#263A47] text-white rounded-md text-sm transition-colors cursor-pointer"
                                    >
                                       Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CategoriasPage;