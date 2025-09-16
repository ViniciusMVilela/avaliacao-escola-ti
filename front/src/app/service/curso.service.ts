import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.models';
import { Disciplina } from '../models/disciplina.models';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/api/curso';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  findById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  create(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  update(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addDisciplina(cursoId: number, disciplina: Disciplina): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiUrl}/${cursoId}/disciplinas`, disciplina);
  }

  removeDisciplina(cursoId: number, disciplina: Disciplina): Observable<Curso> {
    return this.http.delete<Curso>(`${this.apiUrl}/${cursoId}/disciplinas`, { body: disciplina });
  }
}