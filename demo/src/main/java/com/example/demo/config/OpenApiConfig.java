package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    OpenAPI pulseOddsOpenApi() {
        return new OpenAPI().info(new Info()
                .title("PulseOdds Sports Analytics API")
                .version("1.0.0")
                .description("Read-only match, form and live odds analytics for the PulseOdds portfolio application."));
    }
}
