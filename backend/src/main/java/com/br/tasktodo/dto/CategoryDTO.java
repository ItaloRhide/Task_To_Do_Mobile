package com.br.tasktodo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CategoryDTO {
    private Long id;

    @NotBlank(message = "Nome da categoria e obrigatorio")
    @Size(max = 100, message = "Nome da categoria deve ter no maximo 100 caracteres")
    private String nome;

    @Size(max = 255, message = "Descricao da categoria deve ter no maximo 255 caracteres")
    private String descricao;

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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
