package com.br.tasktodo.service;

import com.br.tasktodo.dto.FornecedorDTO;
import com.br.tasktodo.dto.TaskResumoDTO;
import com.br.tasktodo.exception.ResourceNotFoundException;
import com.br.tasktodo.model.Fornecedor;
import com.br.tasktodo.model.Task;
import com.br.tasktodo.repository.FornecedorRepository;
import com.br.tasktodo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FornecedorService {

    @Autowired
    private FornecedorRepository fornecedorRepository;

    @Autowired
    private TaskRepository taskRepository; // Injetando o repositório de Task

    @Transactional(readOnly = true)
    public List<FornecedorDTO> listarTodos() {
        return fornecedorRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FornecedorDTO buscarPorId(Long id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fornecedor não encontrado com o id: " + id));
        return convertToDTO(fornecedor);
    }

    @Transactional
    public FornecedorDTO criarFornecedor(FornecedorDTO fornecedorDTO) {
        Fornecedor fornecedor = new Fornecedor();
        fornecedor.setNome(fornecedorDTO.getNome());
        fornecedor.setCnpj(fornecedorDTO.getCnpj());
        Fornecedor novoFornecedor = fornecedorRepository.save(fornecedor);
        return convertToDTO(novoFornecedor);
    }

    @Transactional
    public FornecedorDTO atualizarFornecedor(Long id, FornecedorDTO fornecedorDTO) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fornecedor não encontrado com o id: " + id));
        fornecedor.setNome(fornecedorDTO.getNome());
        fornecedor.setCnpj(fornecedorDTO.getCnpj());
        Fornecedor fornecedorAtualizado = fornecedorRepository.save(fornecedor);
        return convertToDTO(fornecedorAtualizado);
    }

    @Transactional
    public void excluirFornecedor(Long id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fornecedor não encontrado com o id: " + id));

        // Cria uma cópia da coleção para evitar ConcurrentModificationException
        for (Task task : new HashSet<>(fornecedor.getTasks())) {
            task.getFornecedores().remove(fornecedor);
            taskRepository.save(task); // Salva a tarefa para atualizar a tabela de junção
        }

        fornecedorRepository.delete(fornecedor);
    }

    private FornecedorDTO convertToDTO(Fornecedor fornecedor) {
        FornecedorDTO dto = new FornecedorDTO(fornecedor.getId(), fornecedor.getNome(), fornecedor.getCnpj());
        if (fornecedor.getTasks() != null) {
            dto.setTasks(fornecedor.getTasks().stream()
                .map(task -> new TaskResumoDTO(task.getId(), task.getTitulo()))
                .collect(Collectors.toSet()));
        } else {
            dto.setTasks(Collections.emptySet());
        }
        return dto;
    }
}
