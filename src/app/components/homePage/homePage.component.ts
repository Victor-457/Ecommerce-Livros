import { Component, Injectable, OnInit } from '@angular/core';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'app-homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
