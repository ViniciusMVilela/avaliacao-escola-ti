package com.escola.ti.avaliacao.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.escola.ti.avaliacao.domain.Disciplina;
import com.escola.ti.avaliacao.repository.DisciplinaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DisciplinaService {

    private final DisciplinaRepository disciplinaRepository;

    public List<Disciplina> findAll() {
        return disciplinaRepository.findAll();
    }

    public Disciplina getDisciplina(Long id) {
        return disciplinaRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }

    public Disciplina save(Disciplina newDisciplina) {
        return disciplinaRepository.save(newDisciplina);
    }

    public Disciplina updateDisciplina(Long id, Disciplina updateDisciplina) {
        final Disciplina disciplina = getDisciplina(id);

        updateDisciplina.setId(disciplina.getId());
        return disciplinaRepository.save(updateDisciplina);
    }

    public void remove(Long id) {
        final Disciplina disciplina = getDisciplina(id);
        disciplinaRepository.delete(disciplina);
    }
}
