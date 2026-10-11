import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/productoService";
import { obtenerPedidos } from "../services/pedidoService";
import { obtenerClientes } from "../services/clientesService";

function HomePage() {
    const [stats, setStats] = useState({
        totalProductos: 0,
        totalPedidos: 0,
        totalClientes: 0,
        ingresosTotales: 0,
        productoMasVendido: 'N/A',
        ultimosPedidos: []
    });

    useEffect(() => {
        cargarDatosDashboard();
    }, []);

    const cargarDatosDashboard = async () => {
        const [productos, pedidos, clientes] = await Promise.all([
            obtenerProductos(),
            obtenerPedidos(),
            obtenerClientes()
        ]);

        const prods = productos || [];
        const peds = pedidos || [];
        const clis = clientes || [];

        //Calcular ingresos totales
        let ingresos = 0;
        const contadorProductos = {};

        peds.forEach(p => {
            if (p.detalles) {
                p.detalles.forEach(d => {
                    ingresos += (d.cantidad * d.precioUnitario);
                    
                    // Contar ventas por producto
                    const nombreProd = d.producto?.nombre || 'Desconocido';
                    contadorProductos[nombreProd] = (contadorProductos[nombreProd] || 0) + d.cantidad;
                });
            }
        });

        let topProducto = 'N/A';
        let maxVentas = 0;
        Object.entries(contadorProductos).forEach(([nombre, cantidad]) => {
            if (cantidad > maxVentas) {
                maxVentas = cantidad;
                topProducto = `${nombre} (${cantidad} unds)`;
            }
        });

        setStats({
            totalProductos: prods.length,
            totalPedidos: peds.length,
            totalClientes: clis.length,
            ingresosTotales: ingresos,
            productoMasVendido: topProducto,
            ultimosPedidos: peds.slice(-5).reverse() // Tomar los últimos 5
        });
    };

    return (
        <div className="rounded-lg overflow-hidden">
            <h1 className="text-2xl font-bold text-[#263A47] mb-6">Panel de control</h1>

            {/* TARJETAS DE MÉTRICAS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                <div className="bg-[#728495] border border-[#98A9BE] rounded-lg p-4 text-center shadow-sm ">
                    <h3 className="text-[#B4C5D8] text-sm font-medium">Productos</h3>
                    <p className="text-3xl font-bold text-white mt-2">{stats.totalProductos}</p>
                </div>
                <div className="bg-[#728495] border border-[#98A9BE] rounded-lg p-4 text-center shadow-sm">
                    <h3 className="text-[#B4C5D8] text-sm font-medium">Clientes</h3>
                    <p className="text-3xl font-bold text-white mt-2">{stats.totalClientes}</p>
                </div>
                <div className="bg-[#728495] border border-[#98A9BE] rounded-lg p-4 text-center shadow-sm">
                    <h3 className="text-[#B4C5D8] text-sm font-medium">Pedidos</h3>
                    <p className="text-3xl font-bold text-white mt-2" >{stats.totalPedidos}</p>
                </div>
                <div className="bg-[#728495] border border-[#98A9BE] rounded-lg p-4 text-center shadow-sm">
                    <h3 className="text-[#B4C5D8] text-sm font-medium">Ingresos</h3>
                    <p className="text-3xl font-bold text-white mt-2">${stats.ingresosTotales.toFixed(2)}</p>
                </div>
            </div>

            {/* DESTACADO */}
            <div className="bg-[#263A47] p-8 rounded-lg">
                <h3 className="text-[#B4C5D8] text-sm font-medium mb-5" >Producto Más Vendido</h3>
                <p className="text-white">{stats.productoMasVendido}</p>
            </div>

            {/* ÚLTIMOS PEDIDOS */}
            <h3 className="text-2xl font-bold text-[#263A47] mb-6 mt-5" >Últimas ventas realizadas</h3>
            <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }} className="rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-[#263A47] ">
                        <th className="text-white ">Pedido</th>
                        <th className="text-white">Fecha</th>
                        <th className="text-white">Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.ultimosPedidos.map((p) => (
                        <tr key={p.idPedido} className="bg-white   hover:bg-[#98A9BE] transition-colors">
                            <td className="p-2 ml-6"><strong>{p.idPedido}</strong></td>
                            <td>{p.fecha}</td>
                            <td>{p.cliente ? `${p.cliente.nombre} ${p.cliente.apellido || ''}` : 'Cliente N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HomePage;