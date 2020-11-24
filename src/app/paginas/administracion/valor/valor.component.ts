import { Component, OnInit } from '@angular/core';
import { Valor } from './valor'
import { FormControl, Validators, NgModel } from '@angular/forms';
import { TratamientoConsultar } from '../tratamiento/tratamiento';
import { TratamientoService } from '../tratamiento/tratamiento.service';
import { Atributo } from '../atributo/atributo';
import { AtributoService } from '../atributo/atributo.service';
import { ValorService } from './valor.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ValorDialogoComponent } from './valor-dialogo/valor-dialogo.component';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

@Component({
  selector: 'app-valor',
  templateUrl: './valor.component.html',
  styleUrls: ['./valor.component.css']
})
export class ValorComponent implements OnInit {

  tratamientoEscogido: TratamientoConsultar = null;
  atributoEscogido: Atributo = null;

  displayedColumns = ['id', 'descripcion', 'color_primario', 'editar', 'eliminar']
  valores: Valor[] = [];

  tratamientoControl = new FormControl('', [Validators.required]);
  tratamientos: TratamientoConsultar[];

  atributoControl = new FormControl('', [Validators.required]);
  atributos: Atributo[];

  botonNuevoDeshabilitado: boolean;
  error: any;

  valorAux : Valor= {
    id : 0,
    descripcion : '',
    atributo_id: 0,
    color_primario: '',
  }

  constructor(
    private _tratamientoService: TratamientoService,
    private _atributoService: AtributoService,
    private _valorService: ValorService,
    private _dialogo: MatDialog,
    private _notificacion : MatSnackBar
  ) { }


  nuevoValor() {
    this.valorAux.atributo_id = this.atributoEscogido.id
    const dialogoNuevo = this._dialogo.open(ValorDialogoComponent, {
      width: '40%',
      height: 'fit-content',
      data: {
        valor: this.valorAux,
        nuevo: true
      }
    })

    dialogoNuevo.afterClosed().subscribe(
      () => this.consultarValoresAtributo(this.atributoEscogido.id)
    )
  }

  editarValor(valor : Valor){
    const dialogoEditar = this._dialogo.open( ValorDialogoComponent, {
      width: '40%',
      height: 'fit-content',
      data: {
        valor: valor,
        nuevo: false
      }
    })

    dialogoEditar.afterClosed().subscribe(
      () => this.consultarValoresAtributo(this.atributoEscogido.id)
    )
  }

  eliminarValor(valorId: number){
    if (confirm("Esta seguro de eliminar este valor?\nRecuerde que esta acción no podra revertirse")){
      this._valorService.eliminarValor(valorId).subscribe(
        ()=> {
          this.notificacion("Valor eliminado con exito!", "exito-snackbar")
          this.consultarValoresAtributo(this.atributoEscogido.id)
        },
        () => this.notificacion("ERROR eliminando valor!", "fracaso-snackbar")
      )
    }
    
  }

  consultarTratamientos() {
    return this._tratamientoService.obtenerTratamientos().subscribe(
      (resultado: TratamientoConsultar[]) => this.tratamientos = resultado),
      error => this.error = error
  }

  consultarAtributosTratamiento(tratamientoId: number) {
    return this._atributoService.obtenerAtributosTratamiento(tratamientoId).subscribe(
      (resultado: Atributo[]) => this.atributos = resultado),
      error => this.error = error;
  }

  consultarValoresAtributo(atributoId: number) {
    return this._valorService.obtenerValoresAtributo(atributoId).subscribe(
      (resultado: Valor[]) => this.valores = resultado),
      error => this.error = error
  }

  seleccionarAtributos(tratamiento: TratamientoConsultar) {
    this.vaciarAtributos();
    this.consultarAtributosTratamiento(tratamiento.id);
  }

  seleccionarValores(atributo: Atributo) {
    this.atributoEscogido = atributo;
    this.valores = [];
    this.consultarValoresAtributo(atributo.id);
    this.botonNuevoDeshabilitado = false
  }

  vaciarAtributos() {
    this.atributos = [];
    this.valores = [];
    this.botonNuevoDeshabilitado = true;
  }

  vaciarValores() {
    this.valores = [];
    this.botonNuevoDeshabilitado = true;
  }

  notificacion(mensaje : string, estilo : string){
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      panelClass: [estilo],
      duration: 2000,
      verticalPosition: 'top'
    })
  }

  ngOnInit() {
    this.consultarTratamientos();
    this.botonNuevoDeshabilitado = true;
  }


}
