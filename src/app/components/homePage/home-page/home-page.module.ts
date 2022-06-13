import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FeatureSliderComponent } from './../../featureSlider/featureSlider.component';
import { ProductGridComponent } from './../../productGrid/productGrid.component';
import { HomePageComponent } from './../homePage.component';


@NgModule({
  declarations: [
    HomePageComponent,
    FeatureSliderComponent,
    ProductGridComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent
      }
    ])
  ]
})
export class HomePageModule { }
