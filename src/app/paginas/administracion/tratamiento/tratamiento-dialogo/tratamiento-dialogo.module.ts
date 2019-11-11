import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaletaColoresComponent } from './paleta-colores/paleta-colores.component';
import { Material } from '../../../../material';
import { MatDialogModule } from '@angular/material';
import { TratamientoComponent } from '../tratamiento.component';



@NgModule({
  declarations: [
    TratamientoComponent,
    PaletaColoresComponent
  ],
  imports: [
    CommonModule,
    Material,
    MatDialogModule
  ],
  entryComponents: [
    PaletaColoresComponent
  ],
})
export class TratamientoDialogoModule { }
