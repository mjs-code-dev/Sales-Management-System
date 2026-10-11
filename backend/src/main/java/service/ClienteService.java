/*
* ClienteService.java 16 ago 2026
*
*
* ©Copyright 2026 Montserrat Justo <montserratjustofp25@ibf.cat>
*
* This is free software, licensed under the GNU General Public License v3.
* See http://www.gnu.org/licenses/gpl.html for more information.
*/
package service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.ClientRepository;
import model.Cliente;

@Service
public class ClienteService {
	@Autowired
	private ClientRepository clientRepository;
	public List<Cliente> listarTodo(){
		return clientRepository.findAll();
	}
	public Cliente guardarCliente(Cliente cliente) {
		return clientRepository.save(cliente);
	}
	public Optional<Cliente> obtenerPorId(Long id){
		return clientRepository.findById(id);
	}
	public void eliminarCliente(Long id) {
		clientRepository.deleteById(id);
	}
	public Cliente actualizarCliente(Long id, Cliente datosNuevos) {
	    return clientRepository.findById(id)
	            .map(clienteExistente -> {
	                clienteExistente.setNombre(datosNuevos.getNombre());
	                clienteExistente.setEmail(datosNuevos.getEmail());
	                clienteExistente.setTelefono(datosNuevos.getTelefono());
	                clienteExistente.setFechaAlta(datosNuevos.getFechaAlta());
	                return clientRepository.save(clienteExistente);
	            })
	            .orElse(null);
	}
}
