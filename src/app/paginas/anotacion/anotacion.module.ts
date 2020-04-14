import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeViewCheckComponent, ChecklistDatabase } from './tree-view-check/tree-view-check.component';

import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Material } from 'src/app/material';
import { SelectTextBoxComponent } from './select-text-box/select-text-box.component';
import { AnotacionPoliticaComponent } from './anotacion-politica/anotacion-politica.component';
import { ComentarioAnotacionComponent } from './comentario-anotacion/comentario-anotacion.component';
import { VisualizarAnotacionesComponent } from './visualizar-anotaciones/visualizar-anotaciones.component';
import { NotificacionIncosistenciaComponent } from './notificacion-incosistencia/notificacion-incosistencia.component';

@NgModule({
  declarations: [
    TreeViewCheckComponent,
    SelectTextBoxComponent,
    AnotacionPoliticaComponent,
    ComentarioAnotacionComponent,
    VisualizarAnotacionesComponent,
    NotificacionIncosistenciaComponent
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    Material
  ],
  entryComponents: [
    ComentarioAnotacionComponent,
    VisualizarAnotacionesComponent,
    NotificacionIncosistenciaComponent
  ],
  providers: [ChecklistDatabase],
  exports:[
    TreeViewCheckComponent,
    SelectTextBoxComponent
  ]
})
export class AnotacionModule { }
