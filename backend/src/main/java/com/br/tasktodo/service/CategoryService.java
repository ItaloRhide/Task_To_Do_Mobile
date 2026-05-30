package com.br.tasktodo.service;

import com.br.tasktodo.dto.CategoryDTO;
import com.br.tasktodo.model.Category;
import com.br.tasktodo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryDTO> findAll() {
        return categoryRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO findById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada: " + id));
        return toDTO(category);
    }

    public CategoryDTO save(CategoryDTO dto) {
        Category category = toEntity(dto);
        Category savedCategory = categoryRepository.save(category);
        return toDTO(savedCategory);
    }

    public CategoryDTO update(Long id, CategoryDTO dto) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada: " + id));

        existing.setNome(dto.getNome());
        existing.setDescricao(dto.getDescricao());

        Category updatedCategory = categoryRepository.save(existing);
        return toDTO(updatedCategory);
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
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
