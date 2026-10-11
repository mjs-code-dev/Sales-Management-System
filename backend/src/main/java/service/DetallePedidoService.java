/*
* DetallePedidoService.java 16 ago 2026
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

import dao.DetalleRepository;
import model.DetallePedido;

@Service
public class DetallePedidoService {
	@Autowired
	private DetalleRepository detalleRepository;
	public List<DetallePedido> listarTodo(){
		return detalleRepository.findAll();
	}
	public DetallePedido guardarDetallePedido(DetallePedido dp) {
		return detalleRepository.save(dp);
	}
	public Optional<DetallePedido> obtenerPorId(Long id){
		return detalleRepository.findById(id);
	}
	public void eliminarDP(Long id) {
		detalleRepository.deleteById(id);
	}
	
}
