import { Component, OnInit } from '@angular/core';
import { DisciplinaService } from '../../service/disciplina.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Disciplina } from '../../models/disciplina.models';

@Component({
  selector: 'app-disciplina-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './disciplina-list.component.html',
  styleUrls: ['./disciplina-list.component.scss']
})
export class DisciplinaListComponent implements OnInit {

  disciplinas: Disciplina[] = [];

  constructor(private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    this.loadDisciplinas();
  }

  loadDisciplinas(): void {
    this.disciplinaService.findAll().subscribe({
      next: (disciplinas) => this.disciplinas = disciplinas,
      error: (error) => console.error('Erro ao carregar disciplinas:', error)
    });
  }

  deleteDisciplina(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta disciplina?')) {
      this.disciplinaService.delete(id).subscribe({
        next: () => this.loadDisciplinas(),
        error: (error) => console.error('Erro ao excluir disciplina:', error)
      });
    }
  }
}
