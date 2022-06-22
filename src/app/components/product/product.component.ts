import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Livro } from './../../shared/models/livro';
import { LivrosService } from 'src/app/shared/services/livros.service';
import { CategoriasService } from './../../shared/services/categorias.service';
import { CalcularFreteCorreiosService } from './../../shared/services/calcular-frete-correios.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public livro: Livro = new Livro();
  public cepMask:string = '00000-000';
  public valoresFrete: any;
  public consultarFreteForm = this.formBuilder.group({
    cep: '',
  });
  public modalRef?: BsModalRef;
  public config = {
    backdrop: false,
    ignoreBackdropClick: false,
    class: 'modal-dialog-centered modal-lg'
  };

  constructor(private _activatedRoute: ActivatedRoute,
    private _livrosServices: LivrosService,
    private _categoriaServices: CategoriasService,
    private modalService: BsModalService,
    private _frete: CalcularFreteCorreiosService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void{

    this.exibirLivro()
  }

  async calcularfrete(template:any){
    if(this.consultarFreteForm.value.cep.length == 8){
      await this._frete.calcularFrete(this.livro, this.consultarFreteForm.value.cep)
        .then((res)=>{
          this.valoresFrete = res
          this.openModal(template)
        })
    } else{
      Swal.fire({
        icon: 'error',
        text: 'CEP incompleto',
      })
    }

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  private async exibirLivro(){

    await this.getLivroId()

    this.livro.categoriasId  = await this.montarCategorias()
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
