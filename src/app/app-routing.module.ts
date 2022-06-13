import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    pathMatch: 'prefix',
    redirectTo:"home"
  },
  {
    path: 'home',
    loadChildren: () => import('./components/homePage/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./components/product/product/product.module').then(m => m.ProductModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
