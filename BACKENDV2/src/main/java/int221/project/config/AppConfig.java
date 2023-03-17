package int221.project.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig implements WebMvcConfigurer {
	@Value("#{'${BACKENDV2.origin.method}'.split(',')}")
	private String[] methodList;
	@Value("#{'${BACKENDV2.origin.host}'.split(',')}")
	String[] hostList;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins(hostList).allowedMethods(methodList);
	}

}
