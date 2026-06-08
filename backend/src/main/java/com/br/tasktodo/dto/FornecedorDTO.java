package com.br.tasktodo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Set;

public class FornecedorDTO {
    private Long id;

    @NotBlank(message = "Nome e obrigatorio")
    @Size(max = 150, message = "Nome deve ter no maximo 150 caracteres")
    private String nome;

    @NotBlank(message = "CNPJ e obrigatorio")
    @Pattern(regexp = "\\d{14}", message = "CNPJ deve conter exatamente 14 digitos")
    private String cnpj;

    @Size(max = 255, message = "Logradouro deve ter no maximo 255 caracteres")
    private String logradouro;

    @Size(max = 100, message = "Bairro deve ter no maximo 100 caracteres")
    private String bairro;

    @Size(max = 100, message = "Cidade deve ter no maximo 100 caracteres")
    private String cidade;

    @Size(min = 2, max = 2, message = "UF deve ter 2 caracteres")
    private String uf;

    @Pattern(regexp = "\\d{8}", message = "CEP deve conter 8 digitos")
    private String cep;

    private Set<TaskResumoDTO> tasks;

    public FornecedorDTO() {
    }

    public FornecedorDTO(Long id, String nome, String cnpj) {
        this.id = id;
        this.nome = nome;
        this.cnpj = cnpj;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public Set<TaskResumoDTO> getTasks() {
        return tasks;
    }

    public void setTasks(Set<TaskResumoDTO> tasks) {
        this.tasks = tasks;
    }
}
