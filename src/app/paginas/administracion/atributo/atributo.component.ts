import { Component, OnInit } from '@angular/core';
import { Atributo } from './atributo';
import { Tratamiento } from '../tratamiento/tratamiento'
import { TratamientoService } from '../tratamiento/tratamiento.service'
import { AtributoService } from './atributo.service'
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AtributoDialogoComponent } from './atributo-dialogo/atributo-dialogo.component';

@Component({
  selector: 'app-atributo',
  templateUrl: './atributo.component.html',
  styleUrls: ['./atributo.component.css'],
  providers: [AtributoService]
})

export class AtributoComponent implements OnInit {

  displayedColumns = ['id', 'descripcion', 'color_primario', 'editar', 'eliminar']
  atributos: Atributo[];
  atributo: Atributo;
  error: any;
  headers: string[];

  tratamientoControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  tratamientos: Tratamiento[] = [];

  atributoAux : Atributo = {
    id: 0,
    descripcion: '',
    color_primario: '',
    tratamiento_id: 0
  }

  tratamientoSeleccionado : Tratamiento;
  botonNuevoDeshabilitado : Boolean;

  constructor(
    private readonly tratamientoService: TratamientoService,
    private readonly atributoService: AtributoService,
    private dialogo : MatDialog
  ) { }

  //DIALOGOS
  editarAtributo(atributoAux: Atributo){
    const dialogoEditar = this.dialogo.open(AtributoDialogoComponent,{
      width:'40%',
      height:'40%',
      data:{
        atributo: atributoAux,
        nuevo:false
      }
    })
  }

  nuevoAtributo(){
    this.atributoAux.tratamiento_id = this.tratamientoSeleccionado.id
    const dialogoNuevo = this.dialogo.open(AtributoDialogoComponent,{
      width:'40%',
      height:'40%',
      data:{
        atributo: this.atributoAux,
        nuevo:true
      }
    })
  }

  //FIN DIALOGOS 

  consultarTratamientos() {
    this.tratamientoService.obtenerTratamientos().subscribe(
      result => {this.tratamientos = result})
  }

  consultarAtributos(){
    this.atributos = [];
    this.atributoService.obtenerTodosAtributos().subscribe(
      (resultado)=>this.atributos = resultado),
      error => this.error = error
  }


  consultarAtributo(id : number) {
    return this.atributoService.obtenerAtributo(id).subscribe(
      (resultado) => this.atributo = resultado),
      error => this.error = error
  }

  consultarAtributosTratamiento(tratamiento_id : number){
    return this.atributoService.obtenerAtributosTratamiento(tratamiento_id).subscribe(
      (resultado) => this.atributos = resultado),
      error => this.error = error;
  }

  vaciarTratamientoSeleccionado(){
    this.tratamientoSeleccionado = undefined;
    this.botonNuevoDeshabilitado = true;
  }

  vaciarAtributos() {
    this.atributos = [];
  }

  seleccionarAtributos(tratamiento: Tratamiento) {
    this.tratamientoSeleccionado = tratamiento;
    this.botonNuevoDeshabilitado = false;
    this.vaciarAtributos();
    this.consultarAtributosTratamiento(tratamiento.id);
  }


  ngOnInit() {
    this.consultarTratamientos();
    this.botonNuevoDeshabilitado = true;
  }
}
