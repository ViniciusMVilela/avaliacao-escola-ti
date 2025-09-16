package com.escola.ti.avaliacao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.escola.ti.avaliacao.domain.Disciplina;

public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {
    List<Disciplina> findByCursoIsNull();
}
