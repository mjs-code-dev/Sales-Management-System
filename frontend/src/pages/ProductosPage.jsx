import { useEffect, useState } from "react";
import { 
    obtenerProductos, 
    crearProducto, 
    actualizarProducto, 
    eliminarProducto 
} from "../services/productoService";
import { obtenerCategorias } from "../services/categoriaService";

function ProductosPage() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [idCategoria, setIdCategoria] = useState('');

    const [idEditando, setIdEditando] = useState(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        const dataProductos = await obtenerProductos();
        const dataCategorias = await obtenerCategorias();
        
        setProductos(dataProductos || []);
        setCategorias(dataCategorias || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !precio || !stock || !idCategoria) {
            alert('Por favor completa todos los campos');
            return;
        }

        const productoData = {
            nombre: nombre,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            categoria: { idCategoria: parseInt(idCategoria) }
        };

        if (idEditando) {
            const actualizado = await actualizarProducto(idEditando, productoData);
            if (actualizado) {
                alert('¡Producto actualizado exitosamente!');
                limpiarFormulario();
                cargarDatos();
            }
        } else {
            const creado = await crearProducto(productoData);
            if (creado) {
                alert('¡Producto creado exitosamente!');
                limpiarFormulario();
                cargarDatos();
            }
        }
    };

    const seleccionarParaEditar = (prod) => {
        setIdEditando(prod.idProducto);
        setNombre(prod.nombre);
        setPrecio(prod.precio);
        setStock(prod.stock);
        setIdCategoria(prod.categoria?.idCategoria || prod.idCategoria || '');
    };

    const limpiarFormulario = () => {
        setIdEditando(null);
        setNombre('');
        setPrecio('');
        setStock('');
        setIdCategoria('');
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
            const exito = await eliminarProducto(id);
            if (exito) {
                alert("Producto eliminado correctamente");
                cargarDatos();
            } else {
                alert("No se pudo eliminar el producto. Verifica que no esté asociado a ningún pedido.");
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#263A47] mb-6">Gestión de productos</h2>

            <section className="mb-8">
                <h3 className="text-xl font-bold text-[#263A47] mb-4">Catálogo de Productos</h3>
                <div className="rounded-lg overflow-hidden shadow-md">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#263A47] text-white">
                                <th className="p-3">ID</th>
                                <th className="p-3">Nombre</th>
                                <th className="p-3">Precio</th>
                                <th className="p-3">Stock</th>
                                <th className="p-3">Categoría</th>
                                <th className="p-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((prod) => (
                                <tr key={prod.idProducto} className="bg-white hover:bg-[#98A9BE]/30 transition-colors border-b border-[#98A9BE]/30 text-[#263A47]">
                                    <td className="p-3 font-semibold">{prod.idProducto}</td>
                                    <td className="p-3">{prod.nombre}</td>
                                    <td className="p-3">{prod.precio}€</td>
                                    <td className="p-3">{prod.stock}</td>
                                    <td className="p-3">{prod.categoria ? prod.categoria.nombre : 'Sin Categoría'}</td>
                                    <td className="p-3 text-center">
                                        <button 
                                            onClick={() => seleccionarParaEditar(prod)}
                                            className="mr-2 px-3 py-1 bg-[#4A5B6A] hover:bg-[#263A47] text-white rounded-md text-sm transition-colors cursor-pointer"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleEliminar(prod.idProducto)}
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
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md border border-[#98A9BE]">
                <h3 className="text-lg font-bold text-[#263A47] mb-4">
                    {idEditando ? 'Editar Producto' : 'Añadir Nuevo Producto'}
                </h3>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[#263A47] font-medium mb-1">Nombre</label>
                        <input 
                            type="text" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            placeholder="Nombre del producto"
                            className="w-full p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[#263A47] font-medium mb-1">Precio (€)</label>
                        <input 
                            type="number" 
                            step="0.01"
                            value={precio} 
                            onChange={(e) => setPrecio(e.target.value)} 
                            placeholder="0.00"
                            className="w-full p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[#263A47] font-medium mb-1">Stock</label>
                        <input 
                            type="number" 
                            value={stock} 
                            onChange={(e) => setStock(e.target.value)} 
                            placeholder="Cantidad en stock"
                            className="w-full p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[#263A47] font-medium mb-1">Categoría</label>
                        <select 
                            value={idCategoria} 
                            onChange={(e) => setIdCategoria(e.target.value)}
                            className="w-full p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
                            required
                        >
                            <option value="">-- Selecciona una categoría --</option>
                            {categorias.map((cat) => (
                                <option key={cat.idCategoria} value={cat.idCategoria}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2 flex gap-3 mt-2">
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-[#263A47] hover:bg-[#4A5B6A] text-white font-medium rounded-md transition-colors cursor-pointer"
                        >
                            {idEditando ? 'Guardar Cambios' : 'Guardar Producto'}
                        </button>

                        {idEditando && (
                            <button 
                                type="button" 
                                onClick={limpiarFormulario} 
                                className="px-4 py-2 bg-[#728495] hover:bg-[#4A5B6A] text-white font-medium rounded-md transition-colors cursor-pointer"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </section>
        </div>
    );
}

export default ProductosPage;