import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from '../material';
import { PaginasComponent } from './paginas.component';
import { PaginasRoutingModule } from './paginas-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ConsolidacionComponent } from './consolidacion/consolidacion.component';
import { AnotacionComponent } from './anotacion/anotacion.component';

@NgModule({
  declarations: [
    PaginasComponent,
    ConsolidacionComponent,
    AnotacionComponent
  ],
  imports: [
    CommonModule,
    Material,
    PaginasRoutingModule,
    HttpClientModule
  ],
  bootstrap:[PaginasComponent],
  providers:[]

})

export class PaginasModule { }

