import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { TratamientoNodoPlano } from '../tree-view-check/tree-view-check.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ComentarioAnotacionComponent } from '../comentario-anotacion/comentario-anotacion.component';
import { Anotacion } from 'src/app/paginas/anotacion/anotacion';
import { SelectTextBoxService } from '../select-text-box/select-text-box.service';

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
  permite : boolean = true;
  listaAnotacion : Anotacion[] = [];
  usuario = JSON.parse(localStorage.getItem("usuario"));

  listaNodos: NodoSeleccionado[] = [];
  lista = new SelectionModel<TratamientoNodoPlano>(true /* multiple */);
  textoHtml: string = "";
  texto: string = "";


  constructor(
    private _router : Router,
    private _dialogo : MatDialog,
    private _seleccionarTextoService : SelectTextBoxService
  ) {
    this.politicaId = this._router.getCurrentNavigation().extras.state.politica_id;
    this._seleccionarTextoService.obtenerTexo().subscribe(
      texto => this.texto = texto
    )
    this._seleccionarTextoService.obtenerTextoHmtl().subscribe(
      textoHtml => this.textoHtml = textoHtml
    )
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


  obtenerParrafoId($event){
    this.parrafoId = $event
  }

  /*obtenerTexto($event) {
    this.texto = $event
  }*/

  obtenerTextoHtml(){
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
      height: '75%',
      data:{
        listaAnotaciones : listaAnotacionesAux
      }
    })

   dialogoComentar.afterClosed().subscribe(
      () =>{
      this.listaAnotacion = []
      //para simular un cambio de parrafo y limpiar todos los campos
      this.parrafoCambiado()
      this._seleccionarTextoService.colocarTexto("")
      this._seleccionarTextoService.colocarTextoHtml("")
      this._seleccionarTextoService.consultarTotalAnotacionesAnotadorParrafoServicio(this.parrafoId, this.usuario.id)
     }
   )
  }

  ngOnInit() {

  }

}
