import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { TratamientoComponent } from './paginas/administracion/tratamiento/tratamiento.component';


const routes: Routes = [
  {
    path:'paginas', 
    loadChildren:() => import('./paginas/paginas.module').then(m => m.PaginasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
