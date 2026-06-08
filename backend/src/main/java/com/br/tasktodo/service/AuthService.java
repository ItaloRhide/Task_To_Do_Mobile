package com.br.tasktodo.service;

import com.br.tasktodo.dto.LoginRequest;
import com.br.tasktodo.dto.LoginResponse;
import com.br.tasktodo.model.User;
import com.br.tasktodo.repository.UserRepository;
import com.br.tasktodo.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public LoginResponse login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            log.warn("Tentativa de login com email nao cadastrado: {}", email);
            throw new RuntimeException("Email ou senha invalidos");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Tentativa de login com senha incorreta para: {}", email);
            throw new RuntimeException("Email ou senha invalidos");
        }

        log.info("Login bem-sucedido: {}", email);
        String token = jwtUtil.generateToken(user.getEmail());
        return new LoginResponse(token, user.getEmail(), user.getNome());
    }
}
