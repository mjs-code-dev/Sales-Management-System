/*
* DETALLE_PEDIDO.java 1 jul 2026
*
*
* ©Copyright 2026 Montserrat Justo <montserratjustofp25@ibf.cat>
*
* This is free software, licensed under the GNU General Public License v3.
* See http://www.gnu.org/licenses/gpl.html for more information.
*/
package model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "DETALLE_PEDIDO")
public class DetallePedido {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_DETALLE")
	private Long idDetalle;
	@ManyToOne
	@JoinColumn(name = "ID_PEDIDO")
	@JsonIgnore
	private Pedido pedido;
	@ManyToOne
	@JoinColumn(name = "ID_PRODUCTO")
	private Producto producto;
	@Column(name = "CANTIDAD")
	private Integer cantidad;
	@Column(name = "PRECIO_UNITARIO")
	private Double precioUnitario;
	
	public DetallePedido() {
		
	}
	
	
	public DetallePedido(Long idDetalle, Pedido pedido, Producto producto, Integer cantidad, Double precioUnitario) {
		this.idDetalle = idDetalle;
		this.pedido = pedido;
		this.producto = producto;
		this.cantidad = cantidad;
		this.precioUnitario = precioUnitario;
	}


	public Long getIdDetalle() {
		return idDetalle;
	}


	public void setIdDetalle(Long idDetalle) {
		this.idDetalle = idDetalle;
	}


	public Pedido getPedido() {
		return pedido;
	}


	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}


	public Producto getProducto() {
		return producto;
	}


	public void setProducto(Producto producto) {
		this.producto = producto;
	}


	public Integer getCantidad() {
		return cantidad;
	}


	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}


	public Double getPrecioUnitario() {
		return precioUnitario;
	}


	public void setPrecioUnitario(Double precioUnitario) {
		this.precioUnitario = precioUnitario;
	}


	@Override
	public String toString() {
		return "DetallePedido [idDetalle=" + idDetalle + ", cantidad=" + cantidad + ", idPedido=" + pedido
				+ ", idProducto=" + producto + ", precioUnitario=" + precioUnitario + "]";
	}
	
}
