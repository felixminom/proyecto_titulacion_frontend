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

  tratamientoSeleccionado : Tratamiento;
  estadoBotonNuevo : Boolean;

  constructor(
    private readonly tratamientoService: TratamientoService,
    private readonly atributoService: AtributoService,
    private dialogo : MatDialog
  ) { }

  //DIALOGOS
  editarAtributo(atributo: Atributo){
    const dialogoEditar = this.dialogo.open(AtributoDialogoComponent,{
      width:'40%',
      height:'50%',
      data:{
        nuevo:false
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
    return this.atributoService.obtenerTodosAtributos().subscribe(
      (resultado : Atributo[])=>this.atributos = resultado),
      error => this.error = error
  }


  consultarAtributo(id : number) {
    return this.atributoService.obtenerAtributo(id).subscribe(
      (resultado : Atributo) => this.atributo = resultado),
      error => this.error = error
  }

  consultarAtributosTratamiento(tratamiento_id : number){
    return this.atributoService.obtenerAtributosTratamiento(tratamiento_id).subscribe(
      (resultado : Atributo[]) => this.atributos = resultado),
      error => this.error = error;
  }

  vaciarTratamientoSeleccionado(){
    this.tratamientoSeleccionado = undefined;
    this.estadoBotonNuevo = true;
  }
  vaciarAtributos() {
    this.atributos = [];
   
  }

  seleccionarAtributos(tratamiento: Tratamiento) {
    this.tratamientoSeleccionado = tratamiento;
    this.estadoBotonNuevo = false;
    this.vaciarAtributos();
    this.consultarAtributosTratamiento(tratamiento.id);
  }


  nuevoAtributo(tratamiento : Tratamiento){
    console.log(tratamiento.id + ' ' + tratamiento.descripcion)
  }


  ngOnInit() {
    this.consultarTratamientos();
    this.estadoBotonNuevo = true;
  }
}
