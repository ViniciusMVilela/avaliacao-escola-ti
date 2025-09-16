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

import com.escola.ti.avaliacao.domain.Curso;
import com.escola.ti.avaliacao.service.CursoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/curso")
@RequiredArgsConstructor
public class CursoResource {

    private final CursoService cursoService;

    @GetMapping("/{id}")
    public ResponseEntity<Curso> findById(@PathVariable Long id) {
        return ResponseEntity.ok(cursoService.getCurso(id));
    }

    @GetMapping
    public ResponseEntity<List<Curso>> findAll() {
        return ResponseEntity.ok(cursoService.findAll());
    }

    @PostMapping
    public ResponseEntity<Curso> create(@RequestBody Curso Curso) {
        return ResponseEntity.ok(cursoService.save(Curso));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curso> update(@PathVariable Long id, @RequestBody Curso Curso) {
        return ResponseEntity.ok(cursoService.update(id, Curso));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        cursoService.delete(id);
        return null;
    }
}
