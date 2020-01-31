import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeViewCheckComponent, ChecklistDatabase } from './tree-view-check/tree-view-check.component';

import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Material } from 'src/app/material';
import { SelectTextBoxComponent } from './select-text-box/select-text-box.component';

@NgModule({
  declarations: [
    TreeViewCheckComponent,
    SelectTextBoxComponent
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    Material
  ],
  providers: [ChecklistDatabase],
  exports:[
    TreeViewCheckComponent,
    SelectTextBoxComponent
  ]
})
export class AnotacionModule { }
