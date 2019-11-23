import { DisciplineModel } from './discipline.model';

export interface ToolModel {
    codigo: number,
    titulo: string,
    objFerramenta: string,
    descFerramenta: string,
    siteFerramenta: string,
    clasFerramenta: string,
    tipoFerramenta: string,
    patFerramenta: string,
    disc_codigo: number,
    cur_codigo: number
}