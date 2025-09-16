import { Routes } from '@angular/router';
import { DisciplinaListComponent } from './disciplina/disciplina-list/disciplina-list.component';
import { DisciplinaFormComponent } from './disciplina/disciplina-form/disciplina-form.component';
import { CursoListComponent } from './curso/curso-list/curso-list.component';
import { CursoFormComponent } from './curso/curso-form/curso-form.component';

export const routes: Routes = [
  { path: "", redirectTo: "/cursos", pathMatch: "full" },
  { path: "disciplinas", component: DisciplinaListComponent },
  { path: "disciplinas/novo", component: DisciplinaFormComponent },
  { path: "disciplinas/:id/edit", component: DisciplinaFormComponent },
  { path: "cursos", component: CursoListComponent },
  { path: "cursos/novo", component: CursoFormComponent },
  { path: "cursos/:id/edit", component: CursoFormComponent }
];
