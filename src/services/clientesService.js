export const obtenerClientes = async () => {
    try {
        const res = await fetch('http://localhost:8080/api/clientes')
        return await res.json()
    } catch (error) {
        console.error('Error al obtener clientes', error)
        return []
    }
}
export const crearCliente = async (nuevoCliente) =>{
    try {
        const res = await fetch('http://localhost:8080/api/clientes',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoCliente) 
            })
            return await res.json()   
    } catch (error) {
        console.error('Error al crear cliente', error)
    return null
    }
}
export const eliminarCliente = async (id) => {
    try {
        const res = await fetch(`http://localhost:8080/api/clientes/${id}`, {method: 'DELETE'})
        return res.ok
    } catch (error) {
        console.error('Error al eliminar cliente', error)
        return false
    }
}
export const actualizarCliente = async (id, clienteActualizado) => {
    try {
        const res = await fetch(`http://localhost:8080/api/clientes/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteActualizado)
        })
        return await res.json()
    } catch (error) {
        console.error('Error al actualizar cliente', error)
        return null
    }
}