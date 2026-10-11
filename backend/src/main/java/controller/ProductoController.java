/*
* ProductoController.java 16 ago 2026
*
*
* ©Copyright 2026 Montserrat Justo <montserratjustofp25@ibf.cat>
*
* This is free software, licensed under the GNU General Public License v3.
* See http://www.gnu.org/licenses/gpl.html for more information.
*/
package controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import model.Producto;
import service.ProductoService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
	@Autowired
	private ProductoService productoService;
	@GetMapping
	public List<Producto> obtenerProductos(){
		return productoService.obtenerTodo();
	}
	@PostMapping
	public Producto guardarProducto(@RequestBody Producto producto) {
		return productoService.guardarProducto(producto);
	}
	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable Long id) {
		productoService.eliminarProductoPorId(id);
	}
	@GetMapping("/{id}")
	
	public Optional<Producto> obtenerPorId(@PathVariable Long id){
		return productoService.obtenerPorId(id);
	}
	@PutMapping("/{id}")
	public Producto actualizarProducto(@PathVariable Long id, @RequestBody Producto producto) {
	    producto.setIdProducto(id); 
	    return productoService.guardarProducto(producto);
	}
}
