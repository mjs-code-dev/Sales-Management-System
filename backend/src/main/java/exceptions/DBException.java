/*
* DBException.java 7 jul 2026
*
*
* ©Copyright 2026 Montserrat Justo <montserratjustofp25@ibf.cat>
*
* This is free software, licensed under the GNU General Public License v3.
* See http://www.gnu.org/licenses/gpl.html for more information.
*/
package exceptions;
public class DBException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public static final String ERROR_CATEGORIA = "Error en categoria";
	public static final String ERROR_PRODUCTO = "Error en producto";
	public static final String ERROR_DETALLE_PEDIDO = "Error en detalle";
	public static final String ERROR_PEDIDO = "Error en el pedido";
	public static final String ERROR_CLIENTE = "Error en apartado del cliente";
	public static final String ERR_CONNECTION = "Error en establecer conexion con el servidor";
    public static final String ERR_DRIVER = "No se ha encontrado el driver";
    public static final String ERR_SQL_SYNTAX = "Error en sintaxis SQL";
    public static final String ERR_CLOSE = "Error en cerrar la conexion";
    public static final String ERR_UNKNOWN = "Error inesperado";
	public static final String ERR_IO ="Error leyendo archivos";
	public DBException(String message, Throwable cause) {
		super(message, cause);
	}
}
