package com.escola.ti.avaliacao.resource;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escola.ti.avaliacao.domain.Disciplina;
import com.escola.ti.avaliacao.service.DisciplinaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/disciplina")
@RequiredArgsConstructor
public class DisciplinaResource {

    private final DisciplinaService disciplinaService;

    @GetMapping("/{id}")
    public ResponseEntity<Disciplina> findById(@PathVariable Long id) {
        return ResponseEntity.ok(disciplinaService.getDisciplina(id));
    }

    @GetMapping
    public ResponseEntity<List<Disciplina>> findAll() {
        return ResponseEntity.ok(disciplinaService.findAll());
    }

    @PostMapping
    public ResponseEntity<Disciplina> create(@RequestBody Disciplina disciplina) {
        return ResponseEntity.ok(disciplinaService.save(disciplina));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Disciplina> update(@PathVariable Long id, @RequestBody Disciplina disciplina) {
        return ResponseEntity.ok(disciplinaService.updateDisciplina(id, disciplina));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        disciplinaService.remove(id);
        return null;
    }
}
