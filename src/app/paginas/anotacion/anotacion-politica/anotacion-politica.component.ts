import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { TratamientoNodoPlano } from '../tree-view-check/tree-view-check.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Anotacion, AnotacionValor, AnotacionNotificacion, AnotacionNotificacionConsultar } from 'src/app/paginas/anotacion/anotacion';
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
  permite: boolean;
  usuario = JSON.parse(localStorage.getItem("usuario"));

  listaValores: NodoSeleccionado[] = [];
  valores: AnotacionValor[] = [];
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
    this._seleccionarTextoService.obtenerTexto().subscribe(
      texto => this.texto = texto
    )
    this._seleccionarTextoService.obtenerTextoHmtl().subscribe(
      textoHtml => this.textoHtml = textoHtml
    )

    this._seleccionarTextoService.obtenerPermite().subscribe(
      permite => this.permite = permite
    )
  }


  parrafoCambiado() {
    this.lista.clear()
    this.listaValores = []
    this._seleccionarTextoService.colocarPermite(false)
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
  }


  obtenerParrafoId($event) {
    this.parrafoId = $event
  }

  guardarAnotacion() {
    this.valores = [];
    if (this.listaValores.length == 0) {
      alert("ES NECESARIO SELECCIONAR AL MENOS UN TRATAMIENTO DE DATOS")
    } else {
      this.listaValores.forEach(
        valor => {
          let valor_aux = new AnotacionValor(valor.id)
          this.valores.push(valor_aux)
        }
      )
      
      let anotacion = new Anotacion(this.texto, this.textoHtml, '', this.parrafoId, this.usuario.id, false, !this.permite, this.valores)

      if (this.usuario.entrenamiento) {
        let anotacionNotificacion = new AnotacionNotificacion(this.usuario.id,this.parrafoId,!this.permite, this.valores)
        console.log(anotacionNotificacion)
        this._anotacionService.notificacionAnotacion(anotacionNotificacion).subscribe(
          (notificacion : AnotacionNotificacionConsultar) => {
            if (notificacion.inconsistencia){
              if(confirm("Esta anotacion contiene un inconsitencia esta seguro de guardarla?")){
                this.enviarAnotacion(anotacion)
              }else{
                this.parrafoCambiado()
                this._seleccionarTextoService.colocarTexto("")
                this._seleccionarTextoService.colocarTextoHtml("") 
              }
            }else{
              this.enviarAnotacion(anotacion)
            }
          },
          () => this.notificacion("ERROR creando anotacion!", "fracaso-snackbar")
        )
      } else {
        this.enviarAnotacion(anotacion)
      }

    };
  }

  enviarAnotacion(anotacion: Anotacion) {
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
