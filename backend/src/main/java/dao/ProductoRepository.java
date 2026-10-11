/*
* ProductoRepository.java 7 ago 2026
*
*
* ©Copyright 2026 Montserrat Justo <montserratjustofp25@ibf.cat>
*
* This is free software, licensed under the GNU General Public License v3.
* See http://www.gnu.org/licenses/gpl.html for more information.
*/
package dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Categoria;
import model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long>{
	List<Producto> findByCategoria(Categoria categoria);
}
