import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { TodoItemFlatNode } from '../tree-view-check/tree-view-check.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatGridTileHeaderCssMatStyler } from '@angular/material';
import { ComentarioAnotacionComponent } from '../comentario-anotacion/comentario-anotacion.component';
import { Anotacion } from 'src/app/paginas/anotacion/anotacion';

export class NodoSeleccionado {
  id: number;
}

@Component({
  selector: 'app-anotacion-politica',
  templateUrl: './anotacion-politica.component.html',
  styleUrls: ['./anotacion-politica.component.css']
})
export class AnotacionPoliticaComponent implements OnInit {

  politicaId : number;
  parrafoId : number = 0;
  permite : boolean = false;
  listaAnotacion : Anotacion[] = [];
  usuario = JSON.parse(localStorage.getItem("usuario"));

  listaNodos: NodoSeleccionado[] = [];
  lista = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
  textoHtml: string = "";
  texto: string = "";


  constructor(
    private _router : Router,
    private _dialogo : MatDialog
  ) {

    this.politicaId = this._router.getCurrentNavigation().extras.state.politica_id
    this._router.ngOnDestroy()
  }


  parrafoCambiado(){
    this.lista.clear()
    this.listaNodos = []
  }

  obtenerLista($event) {
    this.listaNodos = []
    this.lista = $event;
    if (this.lista != null) {
      this.lista.selected.forEach(
        item => {
          if (item.level == 2) {
            this.listaNodos.push(item)
            
          }
        }
      )
    }
  }


  obtenerChecked($event){
    this.permite = !$event
  }

  obtenerParrafoId($event){
    this.parrafoId = $event
  }

  obtenerTexto($event) {
    this.texto = $event
  }

  obtenerTextoHtml($event){
    this.textoHtml = $event;
    if (this.listaNodos.length == 0){
      alert("ES NECESARIO SELECCIONAR AL MENOS UN TRATAMIENTO DE DATOS")
    }else{
      this.listaNodos.forEach(
        valor => {
          let anotacion = new Anotacion(this.texto, this.textoHtml, '', valor.id, this.parrafoId, this.usuario.id, false, this.permite)
          this.listaAnotacion.push(anotacion);
      });
      this.comentarAnotacion(this.listaAnotacion)
    }

  }

  comentarAnotacion(listaAnotacionesAux : Anotacion[]){
    const dialogoComentar = this._dialogo.open(ComentarioAnotacionComponent,{
      width: '40%',
      height: '55%',
      data:{
        listaAnotaciones : listaAnotacionesAux
      }
    })

   dialogoComentar.afterClosed().subscribe(
     resultado =>{
      this.lista.clear()
      this.listaNodos = []
      this.listaAnotacion = []
      this.texto = ''
      this.textoHtml =''
     }

   )
  }


  ngOnInit() {

  }

}
