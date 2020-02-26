import { Component, OnInit } from '@angular/core';
import { Valor, ValorGuardar } from './valor'
import { FormControl, Validators, NgModel } from '@angular/forms';
import { Tratamiento } from '../tratamiento/tratamiento';
import { TratamientoService } from '../tratamiento/tratamiento.service';
import { Atributo } from '../atributo/atributo';
import { AtributoService } from '../atributo/atributo.service';
import { ValorService } from './valor.service';
import { MatDialog } from '@angular/material';
import { ValorDialogoComponent } from './valor-dialogo/valor-dialogo.component';

@Component({
  selector: 'app-valor',
  templateUrl: './valor.component.html',
  styleUrls: ['./valor.component.css']
})
export class ValorComponent implements OnInit {

  tratamientoEscogido: Tratamiento = null;
  atributoEscogido: Atributo = null;

  displayedColumns = ['id', 'descripcion', 'color_primario', 'editar', 'eliminar']
  valores: Valor[];

  tratamientoControl = new FormControl('', [Validators.required]);
  tratamientos: Tratamiento[];

  atributoControl = new FormControl('', [Validators.required]);
  atributos: Atributo[];

  botonNuevoDeshabilitado: boolean;
  error: any;

  valorAux : ValorGuardar = {
    id: 0,
    descripcion : '',
    atributo_id: 0
  }

  constructor(
    private _tratamientoService: TratamientoService,
    private _atributoService: AtributoService,
    private _valorService: ValorService,
    private _dialogo: MatDialog
  ) { }


  nuevoValor() {
    console.log(this.atributoEscogido)
    this.valorAux.atributo_id = this.atributoEscogido.id;
    
    const dialogoNuevo = this._dialogo.open(ValorDialogoComponent, {
      width: '40%',
      height: '40%',
      data: {
        valor: this.valorAux,
        nuevo: true
      }
    })
  }

  consultarTratamientos() {
    return this._tratamientoService.obtenerTratamientos().subscribe(
      (resultado: Tratamiento[]) => this.tratamientos = resultado),
      error => this.error = error
  }

  consultarAtributosTratamiento(tratamientoId: number) {
    return this._atributoService.obtenerAtributosTratamiento(tratamientoId).subscribe(
      (resultado: Atributo[]) => this.atributos = resultado),
      error => this.error = error;
  }

  consultarValores() {
    return this._valorService.obtenerValores().subscribe(
      (resultado: Valor[]) => this.valores = resultado),
      error => this.error = error
  }

  consultarValoresAtributo(atributoId: number) {
    return this._valorService.obtenerValoresAtributo(atributoId).subscribe(
      (resultado: Valor[]) => this.valores = resultado),
      error => this.error = error
  }

  seleccionarAtributos(tratamiento: Tratamiento) {
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

  ngOnInit() {
    this.consultarTratamientos();
    this.botonNuevoDeshabilitado = true;
  }


}
