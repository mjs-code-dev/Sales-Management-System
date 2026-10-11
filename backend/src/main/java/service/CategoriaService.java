/*
* CategoriaService.java 16 ago 2026
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

import dao.CategoriaRepository;
import model.Categoria;

@Service
public class CategoriaService {
	@Autowired
	private CategoriaRepository categoriaRepository;
	public List<Categoria> listarCategorias(){
		return categoriaRepository.findAll();
	}
	public Categoria guardarCategoria(Categoria categoria) {
		return categoriaRepository.save(categoria);
	}
	public Optional<Categoria> obtenerPorId(Long id){
		return categoriaRepository.findById(id);
	}
	public void eliminarCategoria(Long id) {
		categoriaRepository.deleteById(id);
	}
	
}
