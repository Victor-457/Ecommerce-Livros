import { CategoriasService } from './../../shared/services/categorias.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Livro } from './../../shared/models/livro';
import { LivrosService } from 'src/app/shared/services/livros.service';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public livro: Livro = new Livro()
  public cepMask= '00000-000'

  constructor(private _livrosServices: LivrosService,
              private _activatedRoute: ActivatedRoute,
              private _categoriaServices: CategoriasService) { }

   ngOnInit(): void{

    this.exibirLivro()

  }

  private async exibirLivro(){

    await this.getLivroId()

    this.livro.categoriasId  = await this.montarCategorias()
    console.log(this.livro)
  }

  private async montarCategorias(){

    let categorias: any = []
    this.livro.categoriasId.forEach( async (categoria: any) =>
    {
      categorias.push(await this._categoriaServices.getCategoria(categoria))
    })

    return categorias

  }

  private async getLivroId(){
    await this.getLivro(Number(this._activatedRoute.snapshot.paramMap.get('id')))
  }

  private async getLivro(id: number){


    this.livro = await this._livrosServices.getLivro(id)
  }
}
