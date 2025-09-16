package com.escola.ti.avaliacao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.escola.ti.avaliacao.domain.Disciplina;

public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {
}
