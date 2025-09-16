import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CursoService } from '../../service/curso.service';
import { DisciplinaService } from '../../service/disciplina.service';

import { Curso } from '../../models/curso.models';
import { Disciplina } from '../../models/disciplina.models';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {
  cursoForm: FormGroup;
  isEdit = false;
  cursoId: number | null = null;
  loading = false;

  disciplinas: Disciplina[] = [];
  disciplinasSelecionadas: Disciplina[] = [];
  curso: Curso | null = null;

  dateNotPastValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0)

      if (inputDate < today) {
        return { datePast: true };
      }

      return null;
    };
  }

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private disciplinaService: DisciplinaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cursoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cargaHoraria: ['', [Validators.required, Validators.min(1)]],
      dataInicio: ['', [Validators.required, this.dateNotPastValidator()]]
    });
  }

  ngOnInit(): void {
    this.cursoId = this.route.snapshot.params['id'];
    this.isEdit = !!this.cursoId;

    this.loadDisciplinas();

    if (this.isEdit) {
      this.loadCurso();
    }
  }

  loadDisciplinas(): void {
    this.disciplinaService.findDisponiveis().subscribe({
      next: (disciplinas) => {
        this.disciplinas = disciplinas;
      },
      error: (error) => console.error('Erro ao carregar disciplinas:', error)
    });
  }

  loadCurso(): void {
    if (this.cursoId) {
      this.cursoService.findById(this.cursoId).subscribe({
        next: (curso) => {
          this.curso = curso;
          this.disciplinasSelecionadas = curso.disciplinas || [];
          const dataFormatada = curso.dataInicio
            ? new Date(curso.dataInicio).toISOString().split('T')[0]
            : '';
          this.cursoForm.patchValue({
            nome: curso.nome,
            cargaHoraria: curso.cargaHoraria,
            dataInicio: dataFormatada
          });
        },
        error: (error) => console.error('Erro ao carregar curso:', error)
      });
    }
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      this.loading = true;

      const curso: Curso = this.cursoForm.value;

      const operation = this.isEdit
        ? this.cursoService.update(this.cursoId!, curso)
        : this.cursoService.create(curso);

      operation.subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/cursos']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Erro ao salvar curso:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/cursos']);
  }

  adicionarDisciplina(disciplina: Disciplina): void {
    if (this.isEdit && this.cursoId) {
      this.cursoService.addDisciplina(this.cursoId, disciplina).subscribe({
        next: (curso) => {
          this.curso = curso;
          this.disciplinasSelecionadas = curso.disciplinas || [];
          this.loadDisciplinas();
        },
        error: (error) => console.error('Erro ao adicionar disciplina:', error)
      });
    } else {
      if (!this.disciplinasSelecionadas.find(d => d.id === disciplina.id)) {
        this.disciplinasSelecionadas.push(disciplina);
      }
    }
  }

  removerDisciplina(disciplina: Disciplina): void {
    if (this.isEdit && this.cursoId) {
      this.cursoService.removeDisciplina(this.cursoId, disciplina).subscribe({
        next: (curso) => {
          this.curso = curso;
          this.disciplinasSelecionadas = curso.disciplinas || [];
          this.loadDisciplinas();
        },
        error: (error) => console.error('Erro ao remover disciplina:', error)
      });
    } else {
      this.disciplinasSelecionadas = this.disciplinasSelecionadas.filter(d => d.id !== disciplina.id);
    }
  }

  getDisciplinasDisponiveis(): Disciplina[] {
    return this.disciplinas.filter(d =>
      !this.disciplinasSelecionadas.find(ds => ds.id === d.id)
    );
  }

  adicionarDisciplinaPorId(disciplinaId: string): void {
    if (disciplinaId) {
      const disciplina = this.disciplinas.find(d => d.id?.toString() === disciplinaId);
      if (disciplina) {
        this.adicionarDisciplina(disciplina);
      }
    }
  }
}
