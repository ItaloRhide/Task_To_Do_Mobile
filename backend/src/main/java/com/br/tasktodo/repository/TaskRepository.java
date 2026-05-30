package com.br.tasktodo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.br.tasktodo.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Buscar tarefas por status de conclusão
    List<Task> findByConcluida(Boolean concluida);
    
    // Buscar tarefas por prioridade
    List<Task> findByPrioridade(Integer prioridade);
    
    // Buscar tarefas por data de vencimento
    List<Task> findByDataVencimento(LocalDate dataVencimento);
    
    // Buscar tarefas que vencem até uma determinada data
    List<Task> findByDataVencimentoLessThanEqual(LocalDate dataVencimento);

    List<Task> findByDataVencimentoBeforeAndConcluidaFalse(LocalDate dataVencimento);
    
    // Buscar tarefas por título (contendo texto)
    List<Task> findByTituloContainingIgnoreCase(String titulo);
    
    // Buscar tarefas não concluídas ordenadas por prioridade (decrescente) e data de vencimento
    @Query("SELECT t FROM Task t WHERE t.concluida = false ORDER BY t.prioridade DESC, t.dataVencimento ASC")
    List<Task> findTasksPendentesOrderByPrioridadeAndDataVencimento();
    
    // Buscar tarefas por período de vencimento
    @Query("SELECT t FROM Task t WHERE t.dataVencimento BETWEEN :dataInicio AND :dataFim")
    List<Task> findTasksByPeriodoVencimento(@Param("dataInicio") LocalDate dataInicio, 
                                           @Param("dataFim") LocalDate dataFim);

    // Buscar tarefas por ID da categoria
    @Query("SELECT t FROM Task t WHERE t.categoria.id = :categoryId")
    List<Task> findByCategoriaId(@Param("categoryId") Long categoryId);
}
