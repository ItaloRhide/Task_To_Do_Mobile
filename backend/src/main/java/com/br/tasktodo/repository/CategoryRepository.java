package com.br.tasktodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.br.tasktodo.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
