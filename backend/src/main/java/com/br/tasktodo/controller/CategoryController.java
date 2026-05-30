package com.br.tasktodo.controller;

import com.br.tasktodo.dto.CategoryDTO;
import com.br.tasktodo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryDTO> getAll() {
        return categoryService.findAll();
    }

    @GetMapping("/{id}")
    public CategoryDTO getById(@PathVariable Long id) {
        return categoryService.findById(id);
    }

    @PostMapping
    public CategoryDTO create(@RequestBody CategoryDTO category) {
        return categoryService.save(category);
    }

    @PutMapping("/{id}")
    public CategoryDTO update(@PathVariable Long id, @RequestBody CategoryDTO category) {
        return categoryService.update(id, category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }
}
