/*
* ProductoService.java 8 ago 2026
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

import dao.ProductoRepository;
import model.Categoria;
import model.Producto;

@Service
public class ProductoService {
	@Autowired
	private ProductoRepository productoRepository;
	public List<Producto> obtenerTodo(){
		return productoRepository.findAll();
		
	}
	public Producto guardarProducto(Producto producto) {
		return productoRepository.save(producto);
	}
	public List<Producto> buscarPorCategoria(Categoria categoria){
		return productoRepository.findByCategoria(categoria);
	}
	public Optional<Producto> obtenerPorId(Long id){
		return productoRepository.findById(id);
	}
	public void eliminarProductoPorId(Long id) {
		productoRepository.deleteById(id);
	}
}
