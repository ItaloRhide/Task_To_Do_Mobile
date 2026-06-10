package com.br.tasktodo.service;

import com.br.tasktodo.dto.CategoryDTO;
import com.br.tasktodo.dto.FornecedorDTO;
import com.br.tasktodo.dto.TaskDTO;
import com.br.tasktodo.exception.ResourceNotFoundException;
import com.br.tasktodo.model.Category;
import com.br.tasktodo.model.Fornecedor;
import com.br.tasktodo.model.Task;
import com.br.tasktodo.repository.CategoryRepository;
import com.br.tasktodo.repository.FornecedorRepository;
import com.br.tasktodo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private FornecedorRepository fornecedorRepository;

    @Transactional(readOnly = true)
    public List<TaskDTO> listarTodasTarefas() {
        return taskRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public TaskDTO buscarTarefaPorId(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com ID: " + id));
        return toDTO(task);
    }
    
    @Transactional
    public TaskDTO criarTarefa(Task task) {
        validarTask(task);
        
        task.setCategoria(findCategoria(task.getCategoria()));
        
        if (task.getFornecedores() != null && !task.getFornecedores().isEmpty()) {
            task.setFornecedores(findFornecedores(task.getFornecedores()));
        }

        task.setDataCriacao(LocalDateTime.now());
        task.setConcluida(false);
        
        Task savedTask = taskRepository.save(task);
        return toDTO(savedTask);
    }
    
    @Transactional
    public TaskDTO atualizarTarefa(Long id, Task taskAtualizada) {
        Task taskExistente = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com ID: " + id));

        validarTask(taskAtualizada);
        
        taskExistente.setCategoria(findCategoria(taskAtualizada.getCategoria()));

        if (taskAtualizada.getFornecedores() != null) {
            taskExistente.setFornecedores(findFornecedores(taskAtualizada.getFornecedores()));
        } else {
            taskExistente.setFornecedores(new HashSet<>());
        }

        taskExistente.setTitulo(taskAtualizada.getTitulo());
        taskExistente.setDescricao(taskAtualizada.getDescricao());
        taskExistente.setDataVencimento(taskAtualizada.getDataVencimento());
        taskExistente.setPrioridade(taskAtualizada.getPrioridade());
        taskExistente.setConcluida(taskAtualizada.getConcluida());
        taskExistente.setImagem(taskAtualizada.getImagem());
        taskExistente.setDataAtualizacao(LocalDateTime.now());
        
        Task updatedTask = taskRepository.save(taskExistente);
        return toDTO(updatedTask);
    }
    
    @Transactional
    public void excluirTarefa(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Tarefa não encontrada com ID: " + id);
        }
        taskRepository.deleteById(id);
    }
    
    @Transactional
    public TaskDTO marcarComoConcluida(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com ID: " + id));
        task.setConcluida(true);
        task.setDataAtualizacao(LocalDateTime.now());
        Task updatedTask = taskRepository.save(task);
        return toDTO(updatedTask);
    }
    
    @Transactional(readOnly = true)
    public List<TaskDTO> buscarPorCategoria(Long categoryId) {
        return taskRepository.findByCategoriaId(categoryId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TaskDTO> buscarPorStatus(Boolean concluida) {
        return taskRepository.findByConcluida(concluida).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TaskDTO> buscarPorPrioridade(Integer prioridade) {
        validarPrioridade(prioridade);
        return taskRepository.findByPrioridade(prioridade).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TaskDTO> buscarPorTitulo(String titulo) {
        if (titulo == null || titulo.isBlank()) {
            throw new IllegalArgumentException("Titulo de busca e obrigatorio");
        }
        return taskRepository.findByTituloContainingIgnoreCase(titulo.trim()).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TaskDTO> buscarTarefasComVencimentoHoje() {
        return taskRepository.findByDataVencimento(LocalDate.now()).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TaskDTO> buscarTarefasVencidas() {
        return taskRepository.findByDataVencimentoBeforeAndConcluidaFalse(LocalDate.now()).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TaskDTO> buscarTarefasPendentes() {
        return taskRepository.findTasksPendentesOrderByPrioridadeAndDataVencimento().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TaskDTO> buscarPorPeriodo(LocalDate dataInicio, LocalDate dataFim) {
        if (dataInicio == null || dataFim == null) {
            throw new IllegalArgumentException("Data inicial e data final sao obrigatorias");
        }
        if (dataInicio.isAfter(dataFim)) {
            throw new IllegalArgumentException("Data inicial nao pode ser posterior a data final");
        }
        return taskRepository.findTasksByPeriodoVencimento(dataInicio, dataFim).stream().map(this::toDTO).collect(Collectors.toList());
    }

    private void validarTask(Task task) {
        if (task.getDataVencimento().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Data de vencimento não pode ser anterior à data atual");
        }
        validarPrioridade(task.getPrioridade());
    }

    private void validarPrioridade(Integer prioridade) {
        if (prioridade == null || prioridade < 1 || prioridade > 5) {
            throw new IllegalArgumentException("Prioridade deve estar entre 1 (baixa) e 5 (alta)");
        }
    }

    private Category findCategoria(Category category) {
        if (category != null && category.getId() != null) {
            return categoryRepository.findById(category.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada com ID: " + category.getId()));
        }
        throw new IllegalArgumentException("Categoria é obrigatória.");
    }

    private Set<Fornecedor> findFornecedores(Set<Fornecedor> fornecedores) {
        return fornecedores.stream()
            .map(f -> fornecedorRepository.findById(f.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Fornecedor não encontrado com ID: " + f.getId())))
            .collect(Collectors.toSet());
    }

    private TaskDTO toDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitulo(task.getTitulo());
        dto.setDescricao(task.getDescricao());
        dto.setDataVencimento(task.getDataVencimento());
        dto.setConcluida(task.getConcluida());
        dto.setPrioridade(task.getPrioridade());
        dto.setDataCriacao(task.getDataCriacao());
        dto.setDataAtualizacao(task.getDataAtualizacao());
        dto.setImagem(task.getImagem());
        
        if (task.getCategoria() != null) {
            CategoryDTO catDto = new CategoryDTO();
            catDto.setId(task.getCategoria().getId());
            catDto.setNome(task.getCategoria().getNome());
            catDto.setDescricao(task.getCategoria().getDescricao());
            dto.setCategoria(catDto);
        }

        if (task.getFornecedores() != null) {
            dto.setFornecedores(task.getFornecedores().stream()
                .map(f -> new FornecedorDTO(f.getId(), f.getNome(), f.getCnpj() != null ? f.getCnpj() : ""))
                .collect(Collectors.toSet()));
        }
        
        return dto;
    }
}
