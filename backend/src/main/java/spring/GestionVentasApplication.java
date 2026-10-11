/*
* GestionVentasApplication.java 16 ago 2026
*
*
* ©Copyright 2026 Montserrat Justo <montserratjustofp25@ibf.cat>
*
* This is free software, licensed under the GNU General Public License v3.
* See http://www.gnu.org/licenses/gpl.html for more information.
*/
package spring;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"controller", "dao", "model", "service", "utils", "exceptions", "spring"})
@EnableJpaRepositories(basePackages = "dao")
@EntityScan(basePackages = "model")
public class GestionVentasApplication {

    public static void main(String[] args) {
    	System.out.println("iniciando");
        SpringApplication.run(GestionVentasApplication.class, args);
    }
  
}
