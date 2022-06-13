import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  getCategorias(){
    return this.http.get("http://localhost:3000/categorias");
  }

  async getCategoria(id: number):Promise<any>{
    return await lastValueFrom(this.http.get(`http://localhost:3000/categorias/${id-1}`)).catch( erro => -1);
  }
}
