import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from 'src/app/material';
import { AnotacionModule } from '../anotacion/anotacion.module';
import { TreeViewConsolidacionComponent } from './tree-view-consolidacion/tree-view-consolidacion.component';
import { ChecklistDatabase } from '../anotacion/tree-view-tratamientos/tree-view-tratamientos.component';
import { ConsolidacionPoliticaComponent } from './consolidacion-politica/consolidacion-politica.component';
import { SelectTextConsolidacionComponent } from './select-text-consolidacion/select-text-consolidacion.component';
import { UsuarioAnotacionComponent } from './usuario-anotacion/usuario-anotacion.component';
import { VisualizarDetallesComponent } from './visualizar-detalles/visualizar-detalles.component';


@NgModule({
  declarations: [
    TreeViewConsolidacionComponent,
    ConsolidacionPoliticaComponent,
    SelectTextConsolidacionComponent,
    UsuarioAnotacionComponent,
    VisualizarDetallesComponent
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
  entryComponents:[
    VisualizarDetallesComponent
  ]

})
export class ConsolidacionModule { }
