package com.br.tasktodo.controller;

import com.br.tasktodo.dto.TaskDTO;
import com.br.tasktodo.model.Task;
import com.br.tasktodo.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@Validated
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> listarTodasTarefas() {
        List<TaskDTO> tasks = taskService.listarTodasTarefas();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> buscarTarefaPorId(@PathVariable Long id) {
        TaskDTO task = taskService.buscarTarefaPorId(id);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/categoria/{categoryId}")
    public ResponseEntity<List<TaskDTO>> getTasksByCategoryId(@PathVariable Long categoryId) {
        List<TaskDTO> tasks = taskService.buscarPorCategoria(categoryId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/status/{concluida}")
    public ResponseEntity<List<TaskDTO>> buscarPorStatus(@PathVariable Boolean concluida) {
        List<TaskDTO> tasks = taskService.buscarPorStatus(concluida);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/prioridade/{prioridade}")
    public ResponseEntity<List<TaskDTO>> buscarPorPrioridade(@PathVariable Integer prioridade) {
        List<TaskDTO> tasks = taskService.buscarPorPrioridade(prioridade);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<TaskDTO>> buscarPorTitulo(@RequestParam String titulo) {
        List<TaskDTO> tasks = taskService.buscarPorTitulo(titulo);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/vencimento/hoje")
    public ResponseEntity<List<TaskDTO>> buscarComVencimentoHoje() {
        List<TaskDTO> tasks = taskService.buscarTarefasComVencimentoHoje();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/vencidas")
    public ResponseEntity<List<TaskDTO>> buscarVencidas() {
        List<TaskDTO> tasks = taskService.buscarTarefasVencidas();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/pendentes")
    public ResponseEntity<List<TaskDTO>> buscarPendentes() {
        List<TaskDTO> tasks = taskService.buscarTarefasPendentes();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/periodo")
    public ResponseEntity<List<TaskDTO>> buscarPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        List<TaskDTO> tasks = taskService.buscarPorPeriodo(dataInicio, dataFim);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<TaskDTO> criarTarefa(@Valid @RequestBody Task task) {
        TaskDTO novaTarefa = taskService.criarTarefa(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaTarefa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> atualizarTarefa(@PathVariable Long id, @Valid @RequestBody Task task) {
        TaskDTO tarefaAtualizada = taskService.atualizarTarefa(id, task);
        return ResponseEntity.ok(tarefaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirTarefa(@PathVariable Long id) {
        taskService.excluirTarefa(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/concluir")
    public ResponseEntity<TaskDTO> marcarComoConcluida(@PathVariable Long id) {
        TaskDTO task = taskService.marcarComoConcluida(id);
        return ResponseEntity.ok(task);
    }
}
