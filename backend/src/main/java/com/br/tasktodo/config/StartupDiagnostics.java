package com.br.tasktodo.config;

import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupDiagnostics implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(StartupDiagnostics.class);

    @Value("${server.port}")
    private String serverPort;

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    @Value("${spring.datasource.username}")
    private String datasourceUsername;

    @Override
    public void run(ApplicationArguments args) {
        logger.info("Backend iniciado com sucesso na porta {}", serverPort);
        logger.info("Banco configurado: url={}, usuario={}", datasourceUrl, datasourceUsername);
        logger.info("Arquivo de log ativo em backend/logs/backend.log");
    }

    @PreDestroy
    public void onShutdown() {
        logger.warn("Backend recebeu sinal de encerramento. Verifique as linhas anteriores para a causa.");
    }
}
