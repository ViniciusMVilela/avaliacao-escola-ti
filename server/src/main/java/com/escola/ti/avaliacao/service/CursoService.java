package com.escola.ti.avaliacao.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.escola.ti.avaliacao.domain.Curso;
import com.escola.ti.avaliacao.domain.Disciplina;
import com.escola.ti.avaliacao.repository.CursoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CursoService {

    private final CursoRepository cursoRepository;

    public List<Curso> findAll() {
        return cursoRepository.findAll();
    }

    public Curso getCurso(Long id) {
        return cursoRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }

    public Curso save(Curso newCurso) {
        return this.cursoRepository.save(newCurso);
    }

    public Curso update(Long id, Curso updatedCurso) {
        final Curso curso = getCurso(id);
        updatedCurso.setId(curso.getId());

        return save(updatedCurso);
    }

    public void delete(Long id) {
        final Curso curso = getCurso(id);
        cursoRepository.delete(curso);
    }

    public Curso addDisciplina(Long cursoId, Disciplina disciplina) {
        final Curso curso = getCurso(cursoId);
        curso.getDisciplinas().add(disciplina);

        return cursoRepository.saveAndFlush(curso);

    }

    public Curso removeDisciplina (Long cursoId, Disciplina disciplina) {
        final Curso curso = getCurso(cursoId);
        curso.getDisciplinas().remove(disciplina);

        return cursoRepository.saveAndFlush(curso);
    }
}
