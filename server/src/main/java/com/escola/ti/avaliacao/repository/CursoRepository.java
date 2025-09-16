package com.escola.ti.avaliacao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.escola.ti.avaliacao.domain.Curso;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
}
