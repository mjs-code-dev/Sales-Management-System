export const obtenerPedidos = async () => {
    try {
        const res = await fetch('http://localhost:8080/api/pedidos')
        return await res.json()
    } catch (error) {
        console.error('Error al obtener pedidos', error)
        return []
    }
}
export const crearPedido = async(nuevoPedido) => {
    try {
        const res = await fetch('http://localhost:8080/api/pedidos',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }, body: JSON.stringify(nuevoPedido)
        })
        return await res.json()
    } catch (error) {
        console.error('Error al crear pedido', error)
        return null
    }
}