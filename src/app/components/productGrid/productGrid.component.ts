import { Component, Injectable, OnInit } from '@angular/core';

import { LivrosService } from 'src/app/shared/services/livros.service';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'productGrid',
  templateUrl: './productGrid.component.html',
  styleUrls: ['./productGrid.component.css']
})
export class ProductGridComponent implements OnInit {

  public gridLivros: any = ["1",'2','3',"4",'5','6',"7",'8','9']
  teste:any = ["1",'2','3',"4",'5','6',"7",'8','9']
  constructor(private livrosService: LivrosService) { }

  async ngOnInit() {
    this.gridLivros = await this.livrosService.getRangeLivros()
    console.log(this.gridLivros)
  }

}
