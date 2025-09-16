import { Disciplina } from "./disciplina.models";

export interface Curso {
  id?: number;
  nome: string;
  cargaHoraria: number;
  dataInicio: string;
  disciplinas?: Disciplina[];
}

