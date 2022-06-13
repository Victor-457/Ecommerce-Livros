import { Categoria } from './categoria';

export class Livro {
  constructor(
    public id: number = -1,
    public emEstoque: boolean = false,
    public preco: string = "",
    public picture: string = "",
    public autor: string = "",
    public titulo: string = "",
    public descricao: string = "",
    public editora: string = "",
    public idioma: string = "",
    public encadernacao: string = "",
    public paginas: number = -1,
    public categoriasId: any[] = [],
    public codigo: string = ""
  ){}
}
