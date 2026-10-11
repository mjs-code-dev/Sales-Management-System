/*
* PedidoService.java 16 ago 2026
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
import dao.PedidoRepository;
import model.Cliente;
import model.DetallePedido;
import model.Pedido;

@Service
public class PedidoService {
	@Autowired
	private PedidoRepository pedidoRepository;
	@Autowired
	private ClientRepository clientRepository;
	public List<Pedido> listarTodo(){
		return pedidoRepository.findAll();
	}
	
	public Pedido guardarPedido(Pedido pedido) {
		Long idCliente = pedido.getCliente().getIdCliente();
	    Cliente clienteReal = clientRepository.findById(idCliente)
	        .orElseThrow(() -> new RuntimeException("Cliente no encontrado con id: " + idCliente));
	    pedido.setCliente(clienteReal);

	    // 2. Vincular el pedido a cada detalle
	    if (pedido.getDetalles() != null) {
	        for (DetallePedido detalle : pedido.getDetalles()) {
	            detalle.setPedido(pedido);
	        }
	    }

	    // 3. Guardar todo en cascada
	    return pedidoRepository.save(pedido);
	}
	public Optional<Pedido> obtenerPorId(Long id){
		return pedidoRepository.findById(id);
	}
	public void eliminarPedido(Long id) {
		pedidoRepository.deleteById(id);
	}
	public List<Pedido> buscarPorCliente(Cliente cliente){
		return pedidoRepository.findByCliente(cliente);
	}
}
