import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { TratamientoNodoPlano } from '../tree-view-check/tree-view-check.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Anotacion } from 'src/app/paginas/anotacion/anotacion';
import { SelectTextBoxService } from '../select-text-box/select-text-box.service';
import { AnotacionService } from '../anotacion.service';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

export class NodoSeleccionado {
  id: number;
}

@Component({
  selector: 'app-anotacion-politica',
  templateUrl: './anotacion-politica.component.html',
  styleUrls: ['./anotacion-politica.component.css']
})
export class AnotacionPoliticaComponent {

  politicaId: number;
  parrafoId: number = 0;
  permite: boolean = false;
  listaAnotacion: Anotacion[] = [];
  usuario = JSON.parse(localStorage.getItem("usuario"));

  listaNodos: NodoSeleccionado[] = [];
  lista = new SelectionModel<TratamientoNodoPlano>(true /* multiple */);
  textoHtml: string = "";
  texto: string = "";


  constructor(
    private _router: Router,
    private _anotacionService: AnotacionService,
    private _seleccionarTextoService: SelectTextBoxService,
    private _notificacion: MatSnackBar
  ) {
    this.politicaId = this._router.getCurrentNavigation().extras.state.politica_id;
    this._seleccionarTextoService.obtenerTexo().subscribe(
      texto => this.texto = texto
    )
    this._seleccionarTextoService.obtenerTextoHmtl().subscribe(
      textoHtml => this.textoHtml = textoHtml
    )
  }


  parrafoCambiado() {
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


  obtenerParrafoId($event) {
    this.parrafoId = $event
  }

  obtenerPermite($event) {
    this.permite = $event
  }

  obtenerTextoHtml() {
    if (this.listaNodos.length == 0) {
      alert("ES NECESARIO SELECCIONAR AL MENOS UN TRATAMIENTO DE DATOS")
    } else {
      this.listaNodos.forEach(
        valor => {
          let anotacion = new Anotacion(this.texto, this.textoHtml, '', valor.id, this.parrafoId, this.usuario.id, false, !this.permite)
          this.listaAnotacion.push(anotacion);
        });

      this.listaAnotacion.forEach(
        anotacion => {
          this._anotacionService.guardarAnotacion(anotacion).subscribe(
            () => {
              this.notificacion("Anotacion creada con exito!", "exito-snackbar")
              setTimeout(
                () => {
                  this.listaAnotacion = []
                  //Simular un cambio de parrafo y limpiar todos los campos
                  this.parrafoCambiado()
                  this._seleccionarTextoService.colocarTexto("")
                  this._seleccionarTextoService.colocarTextoHtml("")
                  this._seleccionarTextoService.consultarTotalAnotacionesAnotadorParrafoServicio(this.parrafoId, this.usuario.id)
                },
                1000
              )
            },
            () => this.notificacion("ERROR creando anotacion!", "fracaso-snackbar")
          )
        }
      )
    }
  }

  notificacion(mensaje: string, estilo: string) {
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      panelClass: [estilo],
      duration: 2000,
      verticalPosition: 'top'
    })
  }
}
