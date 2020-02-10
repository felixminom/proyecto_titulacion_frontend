import { Component, OnInit } from '@angular/core';
import { NodoSeleccionado } from '../anotacion.component';
import { SelectionModel } from '@angular/cdk/collections';
import { TodoItemFlatNode } from '../tree-view-check/tree-view-check.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anotacion-politica',
  templateUrl: './anotacion-politica.component.html',
  styleUrls: ['./anotacion-politica.component.css']
})
export class AnotacionPoliticaComponent implements OnInit {


  constructor(
    private _router : Router
    ) { 
      console.log(this._router.getCurrentNavigation().extras.state)
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
          } 
        }
      )
    }
   }
  
   obtenerTexto($event){
     this.texto = $event
   }
  
   obtenerTextoHtml($event){
    this.textoHtml =$event;
  }
    
    ngOnInit() {
  
    }
  
}
