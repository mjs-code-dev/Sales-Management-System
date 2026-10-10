import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productoService";
import { obtenerClientes } from "../services/clientesService";
import { crearPedido, obtenerPedidos } from "../services/pedidoService"; 

function PedidosPage() {
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [pedidos, setPedidos] = useState([]); 

    const [idCliente, setIdCliente] = useState('');
    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState('');
    const [cantidad, setCantidad] = useState(1);
    
    const [carrito, setCarrito] = useState([]);
    const [criterio, setCriterio] = useState('fecha');
    const [direccion, setDireccion] = useState('asc');

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        const prods = await obtenerProductos();
        const clis = await obtenerClientes();
        const peds = await obtenerPedidos(); 
        
        setProductos(prods || []);
        setClientes(clis || []);
        setPedidos(peds || []);
    };

    const agregarAlCarrito = () => {
        if (!idProductoSeleccionado) {
            alert("Por favor selecciona un producto.");
            return;
        }

        const productoEncontrado = productos.find(p => p.idProducto === parseInt(idProductoSeleccionado));

        if (!productoEncontrado) return;

        const cantidadIngresada = parseInt(cantidad);

        if (cantidadIngresada <= 0) {
            alert("La cantidad debe ser mayor a 0.");
            return;
        }

        const itemExistente = carrito.find(item => item.producto.idProducto === productoEncontrado.idProducto);
        const cantidadPreviasEnCarrito = itemExistente ? itemExistente.cantidad : 0;
        const cantidadTotalDeseada = cantidadPreviasEnCarrito + cantidadIngresada;

        if (cantidadTotalDeseada > productoEncontrado.stock) {
            alert(`Stock insuficiente. Solo hay ${productoEncontrado.stock} unidades disponibles (ya tienes {cantidadPreviasEnCarrito}€).`);
            return;
        }

        if (itemExistente) {
            setCarrito(carrito.map(item => 
                item.producto.idProducto === productoEncontrado.idProducto
                    ? { ...item, cantidad: cantidadTotalDeseada }
                    : item
            ));
        } else {
            setCarrito([...carrito, { producto: productoEncontrado, cantidad: cantidadIngresada }]);
        }

        setIdProductoSeleccionado('');
        setCantidad(1);
    };

    const eliminarDelCarrito = (indexAEliminar) => {
        setCarrito(carrito.filter((_, index) => index !== indexAEliminar));
    };

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    };

    const pedidosOrdenados = [...pedidos].sort((a, b) => {
        let valorA, valorB;

        if (criterio === 'fecha') {
            valorA = a.fecha || '';
            valorB = b.fecha || '';
        } else if (criterio === 'cliente') {
            valorA = a.cliente ? `${a.cliente.nombre} ${a.cliente.apellido || ''}` : '';
            valorB = b.cliente ? `${b.cliente.nombre} ${b.cliente.apellido || ''}` : '';
        }

        if (criterio === 'cliente') {
            return direccion === 'asc' 
                ? valorA.localeCompare(valorB) 
                : valorB.localeCompare(valorA);
        } else {
            if (valorA < valorB) return direccion === 'asc' ? -1 : 1;
            if (valorA > valorB) return direccion === 'asc' ? 1 : -1;
            return 0;
        }
    });

    const cambiarOrden = (nuevoCriterio) => {
        if (criterio === nuevoCriterio) {
            setDireccion(direccion === 'asc' ? 'desc' : 'asc');
        } else {
            setCriterio(nuevoCriterio);
            setDireccion('asc');
        }
    };

    const handleSubmitPedido = async (e) => {
        e.preventDefault();

        if (!idCliente) {
            alert("Por favor selecciona un cliente.");
            return;
        }

        if (carrito.length === 0) {
            alert("El carrito está vacío. Agrega al menos un producto.");
            return;
        }

        const nuevoPedido = {
            cliente: { idCliente: parseInt(idCliente) },
            fecha: new Date().toISOString().split('T')[0],
            detalles: carrito.map(item => ({
                producto: { idProducto: item.producto.idProducto },
                cantidad: item.cantidad,
                precioUnitario: item.producto.precio
            }))
        };

        const res = await crearPedido(nuevoPedido);
        if (res) {
            alert("Pedido registrado con éxito");
            setCarrito([]);
            setIdCliente('');
            cargarDatos(); 
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#263A47] mb-6">Gestión de pedidos</h2>
            <section className="bg-white p-6 rounded-lg shadow-md border border-[#98A9BE] mb-8">
                <h3 className="text-lg font-bold text-[#263A47] mb-4">Registrar Nuevo Pedido</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-[#263A47] font-medium mb-1">Cliente</label>
                        <select 
                            value={idCliente} 
                            onChange={(e) => setIdCliente(e.target.value)}
                            className="w-full p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
                        >
                            <option value=""> Selecciona un cliente </option>
                            {clientes.map(cli => (
                                <option key={cli.idCliente} value={cli.idCliente}>
                                    {cli.nombre} {cli.apellido || ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-[#263A47] font-medium mb-1">Agregar productos</label>
                        <div className="flex gap-2">
                            <select 
                                value={idProductoSeleccionado} 
                                onChange={(e) => setIdProductoSeleccionado(e.target.value)}
                                className="flex-1 p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
                            >
                                <option value="">Producto</option>
                                {productos.map(prod => (
                                    <option key={prod.idProducto} value={prod.idProducto}>
                                        {prod.nombre} - {prod.precio}€ (Stock: {prod.stock})
                                    </option>
                                ))}
                            </select>

                            <input 
                                type="number" 
                                min="1" 
                                value={cantidad} 
                                onChange={(e) => setCantidad(e.target.value)}
                                className="w-20 p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
                            />

                            <button 
                                type="button" 
                                onClick={agregarAlCarrito}
                                className="px-4 py-2 bg-[#4A5B6A] hover:bg-[#263A47] text-white font-medium rounded-md transition-colors cursor-pointer"
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>

                {carrito.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-[#98A9BE]/50">
                        <h4 className="text-md font-bold text-[#263A47] mb-3">Resumen del pedido</h4>
                        <div className="rounded-lg overflow-hidden border border-[#98A9BE]/40 mb-4">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#4A5B6A] text-white text-sm">
                                        <th className="p-2">Producto</th>
                                        <th className="p-2">Precio Unit.</th>
                                        <th className="p-2">Cantidad</th>
                                        <th className="p-2">Subtotal</th>
                                        <th className="p-2 text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrito.map((item, index) => (
                                        <tr key={index} className="border-b border-[#98A9BE]/30 text-[#263A47] text-sm">
                                            <td className="p-2">{item.producto.nombre}</td>
                                            <td className="p-2">{item.producto.precio}€</td>
                                            <td className="p-2">{item.cantidad}</td>
                                            <td className="p-2">{(item.producto.precio * item.cantidad).toFixed(2)}€</td>
                                            <td className="p-2 text-center">
                                                <button 
                                                    onClick={() => eliminarDelCarrito(index)}
                                                    className="px-2 py-1 bg-[#728495] hover:bg-[#263A47] text-white rounded text-xs transition-colors cursor-pointer"
                                                >
                                                    Quitar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-bold text-[#263A47]">
                                Total: {calcularTotal().toFixed(2)}€
                            </span>

                            <button 
                                onClick={handleSubmitPedido}
                                className="px-5 py-2 bg-[#263A47] hover:bg-[#4A5B6A] text-white font-medium rounded-md transition-colors cursor-pointer"
                            >
                                Finalizar y Guardar Pedido
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {/* HISTORIAL DE PEDIDOS */}
            <section className="mb-8">
                <h3 className="text-xl font-bold text-[#263A47] mb-4">Historial de Pedidos</h3>
                {pedidos.length === 0 ? (
                    <p className="text-[#4A5B6A]">No hay pedidos registrados en la base de datos.</p>
                ) : (
                    <div className="rounded-lg overflow-hidden shadow-md">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#263A47] text-white">
                                    <th className="p-3">ID</th>
                                    <th 
                                        onClick={() => cambiarOrden('fecha')} 
                                        className="p-3 cursor-pointer select-none hover:bg-[#4A5B6A] transition-colors"
                                    >
                                        Fecha {criterio === 'fecha' ? (direccion === 'asc' ? '↑' : '↓') : '↕'}
                                    </th>
                                    <th 
                                        onClick={() => cambiarOrden('cliente')} 
                                        className="p-3 cursor-pointer select-none hover:bg-[#4A5B6A] transition-colors"
                                    >
                                        Cliente {criterio === 'cliente' ? (direccion === 'asc' ? '↑' : '↓') : '↕'}
                                    </th>
                                    <th className="p-3">Detalles</th>
                                    <th className="p-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidosOrdenados.map((p) => {
                                    const listaDetalles = p.detalles || p.pedidoDetalles || [];
                                    const totalPedido = listaDetalles.reduce((acc, d) => acc + (d.cantidad * d.precioUnitario), 0);

                                    return (
                                        <tr key={p.idPedido} className="bg-white hover:bg-[#98A9BE]/30 transition-colors border-b border-[#98A9BE]/30 text-[#263A47]">
                                            <td className="p-3 font-semibold">#{p.idPedido}</td>
                                            <td className="p-3">{p.fecha}</td>
                                            <td className="p-3">{p.cliente ? `${p.cliente.nombre} ${p.cliente.apellido || ''}` : 'Cliente no asignado'}</td>
                                            <td className="p-3">
                                                <details className="cursor-pointer group">
                                                    <summary className="text-[#4A5B6A] hover:text-[#263A47] font-medium">
                                                        Ver {listaDetalles.length} producto(s)
                                                    </summary>
                                                    <ul className="mt-2 pl-4 list-disc text-sm text-[#4A5B6A]">
                                                        {listaDetalles.map((d, idx) => (
                                                            <li key={idx}>
                                                                {d.producto?.nombre || 'Producto'} x{d.cantidad} ({d.precioUnitario}€ c/u)
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </details>
                                            </td>
                                            <td className="p-3 font-bold">{totalPedido.toFixed(2)}€</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

export default PedidosPage;