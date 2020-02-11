import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from 'src/app/material';
import { AnotacionModule } from '../anotacion/anotacion.module';
import { TreeViewConsolidacionComponent } from './tree-view-consolidacion/tree-view-consolidacion.component';
import { ChecklistDatabase } from '../anotacion/tree-view-check/tree-view-check.component';
import { ConsolidacionPoliticaComponent } from './consolidacion-politica/consolidacion-politica.component';
import { SelectTextConsolidacionComponent } from './select-text-consolidacion/select-text-consolidacion.component';
import { UsuarioAnotacionComponent } from './usuario-anotacion/usuario-anotacion.component';



@NgModule({
  declarations: [
    TreeViewConsolidacionComponent,
    ConsolidacionPoliticaComponent,
    SelectTextConsolidacionComponent,
    UsuarioAnotacionComponent
  ],
  imports: [
    CommonModule,
    AnotacionModule,
    Material
  ],
  providers:[ ChecklistDatabase],
  exports:[
    TreeViewConsolidacionComponent
  ],

})
export class ConsolidacionModule { }
