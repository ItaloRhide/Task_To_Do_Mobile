package com.br.tasktodo.service;

import com.br.tasktodo.dto.DadosCnpjDTO;
import com.br.tasktodo.dto.FornecedorDTO;
import com.br.tasktodo.dto.TaskResumoDTO;
import com.br.tasktodo.exception.ResourceNotFoundException;
import com.br.tasktodo.model.Fornecedor;
import com.br.tasktodo.model.Task;
import com.br.tasktodo.repository.FornecedorRepository;
import com.br.tasktodo.repository.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FornecedorService {

    private static final Logger log = LoggerFactory.getLogger(FornecedorService.class);

    @Autowired
    private FornecedorRepository fornecedorRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private RestTemplate restTemplate;

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
        fornecedor.setLogradouro(fornecedorDTO.getLogradouro());
        fornecedor.setBairro(fornecedorDTO.getBairro());
        fornecedor.setCidade(fornecedorDTO.getCidade());
        fornecedor.setUf(fornecedorDTO.getUf());
        fornecedor.setCep(fornecedorDTO.getCep());
        Fornecedor novoFornecedor = fornecedorRepository.save(fornecedor);
        return convertToDTO(novoFornecedor);
    }

    @Transactional
    public FornecedorDTO atualizarFornecedor(Long id, FornecedorDTO fornecedorDTO) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fornecedor não encontrado com o id: " + id));
        fornecedor.setNome(fornecedorDTO.getNome());
        fornecedor.setCnpj(fornecedorDTO.getCnpj());
        fornecedor.setLogradouro(fornecedorDTO.getLogradouro());
        fornecedor.setBairro(fornecedorDTO.getBairro());
        fornecedor.setCidade(fornecedorDTO.getCidade());
        fornecedor.setUf(fornecedorDTO.getUf());
        fornecedor.setCep(fornecedorDTO.getCep());
        Fornecedor fornecedorAtualizado = fornecedorRepository.save(fornecedor);
        return convertToDTO(fornecedorAtualizado);
    }

    @Transactional
    public void excluirFornecedor(Long id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fornecedor não encontrado com o id: " + id));

        for (Task task : new HashSet<>(fornecedor.getTasks())) {
            task.getFornecedores().remove(fornecedor);
            taskRepository.save(task);
        }

        fornecedorRepository.delete(fornecedor);
    }

    public DadosCnpjDTO consultarCnpj(String cnpj) {
        String url = "https://brasilapi.com.br/api/cnpj/v1/" + cnpj;
        try {
            DadosCnpjDTO dados = restTemplate.getForObject(url, DadosCnpjDTO.class);
            if (dados != null && dados.getNome() == null) {
                log.warn("CNPJ {} retornou sem razao social. Resposta: {}", cnpj, dados);
                throw new RuntimeException("CNPJ nao encontrado");
            }
            return dados;
        } catch (Exception e) {
            log.error("Erro ao consultar CNPJ {} na Brasil API: {}", cnpj, e.getMessage());
            throw new RuntimeException("Nao foi possivel consultar o CNPJ. Tente novamente mais tarde.");
        }
    }

    private FornecedorDTO convertToDTO(Fornecedor fornecedor) {
        FornecedorDTO dto = new FornecedorDTO(fornecedor.getId(), fornecedor.getNome(), fornecedor.getCnpj());
        dto.setLogradouro(fornecedor.getLogradouro());
        dto.setBairro(fornecedor.getBairro());
        dto.setCidade(fornecedor.getCidade());
        dto.setUf(fornecedor.getUf());
        dto.setCep(fornecedor.getCep());
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
