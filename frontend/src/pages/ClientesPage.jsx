import { useState, useEffect } from 'react'
import { 
  obtenerClientes, 
  crearCliente, 
  eliminarCliente, 
  actualizarCliente 
} from '../services/clientesService'

function ClientesPage() {
  const [clientes, setClientes] = useState([])
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fechaAlta: ''
  })

  const [clienteEditandoId, setClienteEditandoId] = useState(null)

  useEffect(() => {
    cargarClientes()
  }, [])

  const cargarClientes = async () => {
    const data = await obtenerClientes()
    setClientes(data || [])
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEditarClick = (cliente) => {
    setClienteEditandoId(cliente.idCliente)
    setFormData({
      nombre: cliente.nombre || '',
      email: cliente.email || '',
      telefono: cliente.telefono || '',
      fechaAlta: cliente.fechaAlta || ''
    })
  }

  const handleCancelarEdicion = () => {
    setClienteEditandoId(null)
    limpiarFormulario()
  }

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      fechaAlta: ''
    })
  }

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este cliente?')) {
      const ok = await eliminarCliente(id)
      if (ok) {
        setClientes(clientes.filter(cli => cli.idCliente !== id))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (clienteEditandoId) {
      const actualizado = await actualizarCliente(clienteEditandoId, formData)
      if (actualizado) {
        setClientes(clientes.map(cli => cli.idCliente === clienteEditandoId ? actualizado : cli))
        setClienteEditandoId(null)
        limpiarFormulario()
      }
    } else {
      const nuevo = await crearCliente(formData)
      if (nuevo) {
        setClientes([...clientes, nuevo])
        limpiarFormulario()
      }
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#263A47] mb-6">Gestión de clientes</h2>

      <section className="mb-8">
        <h3 className="text-xl font-bold text-[#263A47] mb-4">Lista de Clientes</h3>
        <div className="rounded-lg overflow-hidden shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#263A47] text-white">
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Email</th>
                <th className="p-3">Teléfono</th>
                <th className="p-3">Fecha Alta</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cli) => (
                <tr key={cli.idCliente} className="bg-white hover:bg-[#98A9BE]/30 transition-colors border-b border-[#98A9BE]/30 text-[#263A47]">
                  <td className="p-3 font-semibold">{cli.idCliente}</td>
                  <td className="p-3">{cli.nombre}</td>
                  <td className="p-3">{cli.email}</td>
                  <td className="p-3">{cli.telefono}</td>
                  <td className="p-3">{cli.fechaAlta}</td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => handleEditarClick(cli)}
                      className="mr-2 px-3 py-1 bg-[#4A5B6A] hover:bg-[#263A47] text-white rounded-md text-sm transition-colors cursor-pointer"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleEliminar(cli.idCliente)}
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
          {clienteEditandoId ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
        </h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#263A47] font-medium mb-1">Nombre</label>
            <input 
              type="text" 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              placeholder="Nombre completo" 
              className="w-full p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
              required 
            />
          </div>
          <div>
            <label className="block text-[#263A47] font-medium mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Correo electrónico" 
              className="w-full p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
              required 
            />
          </div>
          <div>
            <label className="block text-[#263A47] font-medium mb-1">Teléfono</label>
            <input 
              type="text" 
              name="telefono" 
              value={formData.telefono} 
              onChange={handleChange} 
              placeholder="Teléfono" 
              className="w-full p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
            />
          </div>
          <div>
            <label className="block text-[#263A47] font-medium mb-1">Fecha de alta</label>
            <input 
              type="date" 
              name="fechaAlta" 
              value={formData.fechaAlta} 
              onChange={handleChange} 
              className="w-full p-2 border border-[#98A9BE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5B6A] bg-white text-[#263A47]"
              required 
            />
          </div>

          <div className="md:col-span-2 flex gap-3 mt-2">
            <button 
              type="submit" 
              className="px-4 py-2 bg-[#263A47] hover:bg-[#4A5B6A] text-white font-medium rounded-md transition-colors cursor-pointer"
            >
              {clienteEditandoId ? 'Guardar Cambios' : 'Añadir Cliente'}
            </button>

            {clienteEditandoId && (
              <button 
                type="button" 
                onClick={handleCancelarEdicion} 
                className="px-4 py-2 bg-[#728495] hover:bg-[#4A5B6A] text-white font-medium rounded-md transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  )
}

export default ClientesPage