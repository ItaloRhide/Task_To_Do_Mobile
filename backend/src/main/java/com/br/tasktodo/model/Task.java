package com.br.tasktodo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Título é obrigatório")
    @Size(max = 100, message = "Título deve ter no máximo 100 caracteres")
    @Column(name = "titulo", nullable = false, length = 100)
    private String titulo;

    @Size(max = 500, message = "Descrição deve ter no máximo 500 caracteres")
    @Column(name = "descricao", length = 500)
    private String descricao;

    @NotNull(message = "Data de vencimento é obrigatória")
    @Column(name = "data_vencimento", nullable = false)
    private LocalDate dataVencimento;

    @Column(name = "concluida", nullable = false)
    private Boolean concluida = false;

    @NotNull(message = "Prioridade é obrigatória")
    @Column(name = "prioridade", nullable = false)
    private Integer prioridade;

    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnoreProperties("tasks")
    private Category categoria;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
        name = "task_fornecedor",
        joinColumns = @JoinColumn(name = "task_id"),
        inverseJoinColumns = @JoinColumn(name = "fornecedor_id")
    )
    private Set<Fornecedor> fornecedores;

    // Construtores
    public Task() {
        this.dataCriacao = LocalDateTime.now();
        this.concluida = false;
    }

    public Task(String titulo, String descricao, LocalDate dataVencimento, Integer prioridade) {
        this();
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataVencimento = dataVencimento;
        this.prioridade = prioridade;
    }

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
        this.dataAtualizacao = LocalDateTime.now();
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
        this.dataAtualizacao = LocalDateTime.now();
    }

    public LocalDate getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
        this.dataAtualizacao = LocalDateTime.now();
    }

    public Boolean getConcluida() {
        return concluida;
    }

    public void setConcluida(Boolean concluida) {
        this.concluida = concluida;
        this.dataAtualizacao = LocalDateTime.now();
    }

    public Integer getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(Integer prioridade) {
        this.prioridade = prioridade;
        this.dataAtualizacao = LocalDateTime.now();
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

    public Category getCategoria() {
        return categoria;
    }

    public void setCategoria(Category categoria) {
        this.categoria = categoria;
    }

    public Set<Fornecedor> getFornecedores() {
        return fornecedores;
    }

    public void setFornecedores(Set<Fornecedor> fornecedores) {
        this.fornecedores = fornecedores;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", concluida=" + concluida +
                '}';
    }
}

