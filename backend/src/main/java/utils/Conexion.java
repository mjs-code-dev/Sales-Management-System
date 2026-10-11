/*
* Conexion.java 30 jun 2026
*
*
* ©Copyright 2026 Montserrat Justo <montserratjustofp25@ibf.cat>
*
* This is free software, licensed under the GNU General Public License v3.
* See http://www.gnu.org/licenses/gpl.html for more information.
*/
package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
	public static final String URL_DB = "jdbc:oracle:thin:@localhost:1521/XEPDB1";
	public static final String USER = "GESTION";
	public static final String PASSWORD = "passw0rd";

	public static Connection getConnection() {
		try {
            System.out.println("Conectandose");
            return DriverManager.getConnection(URL_DB, USER, PASSWORD);
        } catch (SQLException e) {
        }
		return null;
	}

	public  void closeConnection(Connection connection)  {
		try {
            System.out.println("CLOSE CONNECTION");
            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (SQLException e) {
           
        }
    }
}
