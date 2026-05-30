package com.br.tasktodo.dto;

import java.util.Set;

public class FornecedorDTO {
    private Long id;
    private String nome;
    private String cnpj;
    private Set<TaskResumoDTO> tasks;

    public FornecedorDTO() {
    }

    public FornecedorDTO(Long id, String nome, String cnpj) {
        this.id = id;
        this.nome = nome;
        this.cnpj = cnpj;
    }

    // Getters e Setters
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

    public Set<TaskResumoDTO> getTasks() {
        return tasks;
    }

    public void setTasks(Set<TaskResumoDTO> tasks) {
        this.tasks = tasks;
    }
}
