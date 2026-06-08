package com.br.tasktodo.config;

import com.br.tasktodo.model.User;
import com.br.tasktodo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            String hash = passwordEncoder.encode("123456");

            userRepository.save(new User("admin@tasktodo.com", hash, "Administrador"));
            userRepository.save(new User("joao@email.com", hash, "Joao Silva"));
            userRepository.save(new User("maria@email.com", hash, "Maria Souza"));

            System.out.println("[DataInitializer] 3 usuarios padrao criados (senha: 123456)");
        }
    }
}
