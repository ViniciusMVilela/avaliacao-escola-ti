import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Disciplina } from '../../models/disciplina.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Curso } from '../../models/curso.models';
import { DisciplinaService } from '../../service/disciplina.service';
import { CursoService } from '../../service/curso.service';

@Component({
  selector: 'app-disciplina-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './disciplina-form.component.html',
  styleUrls: ['./disciplina-form.component.scss']
})
export class DisciplinaFormComponent implements OnInit {

  disciplinaForm: FormGroup;
  isEdit = false;
  disciplinaId: number | null = null;
  loading = false;
  cursos: Curso[] = [];

  constructor(
    private fb: FormBuilder,
    private disciplinaService: DisciplinaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.disciplinaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.disciplinaId = this.route.snapshot.params['id'];
    this.isEdit = !!this.disciplinaId;

    if (this.isEdit) {
      this.loadDisciplina();
    }
  }


  loadDisciplina(): void {
    if (this.disciplinaId) {
      this.disciplinaService.findById(this.disciplinaId).subscribe({
        next: (disciplina) => {
          this.disciplinaForm.patchValue({
            nome: disciplina.nome,
            cursoId: disciplina.cursoId || ''
          });
        },
        error: (error) => console.error('Erro ao carregar disciplina:', error)
      });
    }
  }

  onSubmit(): void {
    if (this.disciplinaForm.valid) {
      this.loading = true;
      const disciplina: Disciplina = {
        ...this.disciplinaForm.value,
        cursoId: this.disciplinaForm.value.cursoId || undefined
      };

      const operation = this.isEdit
        ? this.disciplinaService.update(this.disciplinaId!, disciplina)
        : this.disciplinaService.create(disciplina);

      operation.subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/disciplinas']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Erro ao salvar disciplina:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/disciplinas']);
  }
}
