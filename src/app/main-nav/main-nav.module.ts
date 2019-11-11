import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from '../material';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TreeViewComponent
  ],
  imports: [
    CommonModule,
    Material,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    TreeViewComponent
  ]
})
export class MainNavModule { }
