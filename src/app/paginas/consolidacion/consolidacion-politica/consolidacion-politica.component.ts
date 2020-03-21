import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NodoSeleccionado } from '../../anotacion/anotacion-politica/anotacion-politica.component';
import { SelectionModel } from '@angular/cdk/collections';
import { TratamientoNodoPlano } from '../../anotacion/tree-view-check/tree-view-check.component';
import { AnotacionService } from '../../anotacion/anotacion.service';
import { Anotacion } from '../../anotacion/anotacion';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';
import { MatSnackBar } from '@angular/material';
import { SelectTextBoxComponent } from '../../anotacion/select-text-box/select-text-box.component';
import { SelectTextBoxService } from '../../anotacion/select-text-box/select-text-box.service';

@Component({
  selector: 'app-consolidacion-politica',
  templateUrl: './consolidacion-politica.component.html',
  styleUrls: ['./consolidacion-politica.component.css']
})
export class ConsolidacionPoliticaComponent implements OnInit {

  politicaId: number;
  parrafoId: number = 0;

  usuario = JSON.parse(localStorage.getItem("usuario"));

  listaValores: NodoSeleccionado[] = [];
  lista = new SelectionModel<TratamientoNodoPlano>(true /* multiple */);
  textoHtml: string = "";
  texto: string = "";


  permite: boolean = false;

  constructor(
    private _router: Router,
    private _anotacionService: AnotacionService,
    //private _seleccionarTextoService: SelectTextBoxService,
    private _notificacion: MatSnackBar
  ) {
    this.politicaId = this._router.getCurrentNavigation().extras.state.politica_id;

  }

  parrafoCambiado() {
    this.lista.clear()
    this.listaValores = []
  }
  
  obtenerPermite($event) {
    this.permite = $event
    console.log(this.permite)
  }

  obtenerLista($event) {
    this.listaValores = []
    this.lista = $event;
    if (this.lista != null) {
      this.lista.selected.forEach(
        item => {
          if (item.level == 2) {
            this.listaValores.push(item)

          }
        }
      )
    }
    console.log(this.listaValores)
  }

  guardarAnotaciones() {
    
    /*if (this.listaValores.length == 0) {
      alert("ES NECESARIO SELECCIONAR AL MENOS UN TRATAMIENTO DE DATOS")
    } else {
      this.listaValores.forEach(
        valor => {
          let anotacion = new Anotacion(this.texto, this.textoHtml, '', valor.id, this.parrafoId, this.usuario.id, true, !this.permite)
          this._anotacionService.guardarAnotacion(anotacion).subscribe(
            () => {
              this.notificacion("Anotacion creada con exito!", "exito-snackbar")
              setTimeout(
                () => {
                  
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
        });
    }*/
  }

  notificacion(mensaje: string, estilo: string) {
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      panelClass: [estilo],
      duration: 2000,
      verticalPosition: 'top'
    })
  }

  ngOnInit() {
  }

}
