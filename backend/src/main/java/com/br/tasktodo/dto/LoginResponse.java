package com.br.tasktodo.dto;

public class LoginResponse {

    private String token;
    private String email;
    private String nome;
    private String message;

    public LoginResponse() {}

    public LoginResponse(String token, String email, String nome) {
        this.token = token;
        this.email = email;
        this.nome = nome;
        this.message = "Login realizado com sucesso";
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
