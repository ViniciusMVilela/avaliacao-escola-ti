package com.escola.ti.avaliacao.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.escola.ti.avaliacao.domain.Curso;
import com.escola.ti.avaliacao.domain.Disciplina;
import com.escola.ti.avaliacao.repository.CursoRepository;
import com.escola.ti.avaliacao.repository.DisciplinaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CursoService {

    private final CursoRepository cursoRepository;
    private final DisciplinaRepository disciplinaRepository;

    public List<Curso> findAll() {
        return cursoRepository.findAll();
    }

    public Curso getCurso(Long id) {
        return cursoRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }

    public Curso save(Curso newCurso) {
        if (Objects.nonNull(newCurso.getDisciplinas()) && !newCurso.getDisciplinas().isEmpty()) {
            List<Disciplina> disciplinasGerenciadas = newCurso.getDisciplinas().stream()
                .map(disciplina -> {
                    if (disciplina.getId() != null) {
                        Disciplina disciplinaExistente = disciplinaRepository.findById(disciplina.getId())
                            .orElseThrow(() -> new RuntimeException("Disciplina not found"));
                        disciplinaExistente.setCurso(newCurso);
                        return disciplinaExistente;
                    }
                    return disciplina;
                })
                .toList();
            newCurso.setDisciplinas(disciplinasGerenciadas);
        }
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

    public Curso addDisciplina(Long cursoId, Disciplina disciplinaRequest) {
        final Curso curso = getCurso(cursoId);
        final Disciplina disciplina = disciplinaRepository.findById(disciplinaRequest.getId())
            .orElseThrow(() -> new RuntimeException("Disciplina not found"));

        disciplina.setCurso(curso);
        disciplinaRepository.save(disciplina);

        return getCurso(cursoId);
    }

    public Curso removeDisciplina(Long cursoId, Disciplina disciplinaRequest) {
        final Curso curso = getCurso(cursoId);
        final Disciplina disciplina = disciplinaRepository.findById(disciplinaRequest.getId())
            .orElseThrow(() -> new RuntimeException("Disciplina not found"));

        disciplina.setCurso(null);
        disciplinaRepository.save(disciplina);

        return getCurso(cursoId);
    }
}
