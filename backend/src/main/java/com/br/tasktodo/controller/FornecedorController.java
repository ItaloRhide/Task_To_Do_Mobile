package com.br.tasktodo.controller;

import com.br.tasktodo.dto.FornecedorDTO;
import com.br.tasktodo.service.FornecedorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fornecedores")
public class FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping
    public ResponseEntity<List<FornecedorDTO>> listarTodosFornecedores() {
        List<FornecedorDTO> fornecedores = fornecedorService.listarTodos();
        return ResponseEntity.ok(fornecedores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FornecedorDTO> buscarFornecedorPorId(@PathVariable Long id) {
        FornecedorDTO fornecedor = fornecedorService.buscarPorId(id);
        return ResponseEntity.ok(fornecedor);
    }

    @PostMapping
    public ResponseEntity<FornecedorDTO> criarFornecedor(@Valid @RequestBody FornecedorDTO fornecedorDTO) {
        FornecedorDTO novoFornecedor = fornecedorService.criarFornecedor(fornecedorDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoFornecedor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FornecedorDTO> atualizarFornecedor(@PathVariable Long id, @Valid @RequestBody FornecedorDTO fornecedorDTO) {
        FornecedorDTO fornecedorAtualizado = fornecedorService.atualizarFornecedor(id, fornecedorDTO);
        return ResponseEntity.ok(fornecedorAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirFornecedor(@PathVariable Long id) {
        fornecedorService.excluirFornecedor(id);
        return ResponseEntity.noContent().build();
    }
}
