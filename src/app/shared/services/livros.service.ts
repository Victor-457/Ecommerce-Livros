import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {



  constructor( private http: HttpClient ) { }

  async getRangeLivros(inicio: number = 9,fim: number = 9){
    return await lastValueFrom( this.http.get(`http://localhost:3000/livros?emEstoque=true&id?_start=${inicio}&_end=${fim}`))
  }

  async getLivro(id: number):Promise<any>{
    return await lastValueFrom( this.http.get(`http://localhost:3000/livros/${id}`))
  }

}
