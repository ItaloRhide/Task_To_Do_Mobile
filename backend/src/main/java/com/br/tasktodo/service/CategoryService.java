package com.br.tasktodo.service;

import com.br.tasktodo.dto.CategoryDTO;
import com.br.tasktodo.exception.ResourceNotFoundException;
import com.br.tasktodo.model.Category;
import com.br.tasktodo.repository.CategoryRepository;
import com.br.tasktodo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Transactional(readOnly = true)
    public List<CategoryDTO> findAll() {
        return categoryRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CategoryDTO findById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria nao encontrada com ID: " + id));
        return toDTO(category);
    }

    @Transactional
    public CategoryDTO save(CategoryDTO dto) {
        Category category = toEntity(dto);
        Category savedCategory = categoryRepository.save(category);
        return toDTO(savedCategory);
    }

    @Transactional
    public CategoryDTO update(Long id, CategoryDTO dto) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria nao encontrada com ID: " + id));

        existing.setNome(dto.getNome());
        existing.setDescricao(dto.getDescricao());

        Category updatedCategory = categoryRepository.save(existing);
        return toDTO(updatedCategory);
    }

    @Transactional
    public void delete(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria nao encontrada com ID: " + id));

        if (taskRepository.existsByCategoriaId(id)) {
            throw new IllegalStateException("Categoria nao pode ser excluida porque existem tarefas vinculadas a ela");
        }

        categoryRepository.delete(category);
    }

    private CategoryDTO toDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setNome(category.getNome());
        dto.setDescricao(category.getDescricao());
        return dto;
    }

    private Category toEntity(CategoryDTO dto) {
        Category category = new Category();
        category.setId(dto.getId());
        category.setNome(dto.getNome());
        category.setDescricao(dto.getDescricao());
        return category;
    }
}
