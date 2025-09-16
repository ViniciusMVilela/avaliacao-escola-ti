import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Curso } from '../../models/curso.models';
import { CursoService } from '../../service/curso.service';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.scss']
})
export class CursoListComponent implements OnInit {

  cursos: Curso[] = [];

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursoService.findAll().subscribe({
      next: (cursos) => this.cursos = cursos,
      error: (error) => console.error('Erro ao carregar cursos:', error)
    });
  }

  deleteCurso(id: number): void {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      this.cursoService.delete(id).subscribe({
        next: () => this.loadCursos(),
        error: (error) => console.error('Erro ao excluir curso:', error)
      });
    }
  }

}
