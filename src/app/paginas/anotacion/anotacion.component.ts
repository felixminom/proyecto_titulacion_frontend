import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { TodoItemFlatNode } from './tree-view-check/tree-view-check.component';

export class NodoSeleccionado{
  id : number;
}

@Component({
  selector: 'app-anotacion',
  templateUrl: './anotacion.component.html',
  styleUrls: ['./anotacion.component.css']
})
export class AnotacionComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private documento:Document,
  ) { }

  politica = {
    nombre:'Google LLC'
  }

  listaNodos : NodoSeleccionado[] = [];
  lista = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
  textoHtml : string = "";
  texto : string = "";

 obtenerLista($event){
  this.lista = $event;
  if(this.lista != null){
    this.lista.selected.forEach(
      item =>{
        if(item.level==2){
          console.log(item);
        } 
      }
    )
  }
 }

 obtenerTexto($event){
   this.texto = $event
   console.log(this.texto);
 }

 obtenerTextoHtml($event){
  this.textoHtml =$event;
  console.log(this.textoHtml);
}
  
  ngOnInit() {

  }


}
