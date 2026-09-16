package tn.esprit.ihebsaidi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAspectJAutoProxy
public class IhebsaidiApplication {

	public static void main(String[] args) {
		SpringApplication.run(IhebsaidiApplication.class, args);
	}

}
