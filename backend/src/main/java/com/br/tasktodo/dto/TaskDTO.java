package com.br.tasktodo.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

public class TaskDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private LocalDate dataVencimento;
    private Boolean concluida;
    private Integer prioridade;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
    private CategoryDTO categoria;
    private Set<FornecedorDTO> fornecedores;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public Boolean getConcluida() {
        return concluida;
    }

    public void setConcluida(Boolean concluida) {
        this.concluida = concluida;
    }

    public Integer getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(Integer prioridade) {
        this.prioridade = prioridade;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }

    public CategoryDTO getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoryDTO categoria) {
        this.categoria = categoria;
    }

    public Set<FornecedorDTO> getFornecedores() {
        return fornecedores;
    }

    public void setFornecedores(Set<FornecedorDTO> fornecedores) {
        this.fornecedores = fornecedores;
    }
}
