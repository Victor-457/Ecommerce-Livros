import { Component, OnInit } from '@angular/core';

import { CategoriasService } from 'src/app/shared/services/categorias.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public categorias: any = []
  public isCollapsed:boolean = true

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit() {

    this.categoriasService.getCategorias().subscribe(
      (_obj)=>{
        this.categorias =_obj
        console.log(_obj)
    })
  }

}
