import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaginasComponent} from './paginas.component';
import { ConsolidacionComponent } from './consolidacion/consolidacion.component';
import { AnotacionComponent } from './anotacion/anotacion.component';

const routes: Routes =[{
    path: '',
    component: PaginasComponent,
    children:[
      {
        path:'administracion',
        loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule)
      },
      {
        path:'',
        component: PaginasComponent
      },
      {
        path: 'consolidacion',
        component: ConsolidacionComponent
      },
      {
        path: 'anotacion',
        component: AnotacionComponent
      },
      {
        path:'**',
        component: PaginasComponent
      }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PaginasRoutingModule{

}
  