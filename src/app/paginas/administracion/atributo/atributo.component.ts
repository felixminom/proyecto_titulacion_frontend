import { Component, OnInit } from '@angular/core';
import { Atributo } from './atributo';
import { TratamientoConsultar } from '../tratamiento/tratamiento'
import { TratamientoService } from '../tratamiento/tratamiento.service'
import { AtributoService } from './atributo.service'
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { AtributoDialogoComponent } from './atributo-dialogo/atributo-dialogo.component';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

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
  tratamientos: TratamientoConsultar[] = [];

  atributoAux : Atributo = {
    id: 0,
    descripcion: '',
    color_primario: '',
    tratamiento_id: 0
  }

  tratamientoSeleccionado : TratamientoConsultar;
  botonNuevoDeshabilitado : Boolean;

  constructor(
    private readonly _tratamientoService: TratamientoService,
    private readonly _atributoService: AtributoService,
    private _notificacion : MatSnackBar,
    private _dialogo : MatDialog
  ) { }

  //DIALOGOS
  editarAtributo(atributoAux: Atributo){
    const dialogoEditar = this._dialogo.open(AtributoDialogoComponent,{
      width:'40%',
      height:'40%',
      data:{
        atributo: atributoAux,
        nuevo:false
      }
    })

    dialogoEditar.afterClosed().subscribe(
      ()=> this.consultarAtributosTratamiento(this.tratamientoSeleccionado.id)
    )
  }

  nuevoAtributo(){
    this.atributoAux.tratamiento_id = this.tratamientoSeleccionado.id
    const dialogoNuevo = this._dialogo.open(AtributoDialogoComponent,{
      width:'40%',
      height:'40%',
      data:{
        atributo: this.atributoAux,
        nuevo:true
      }
    })

    dialogoNuevo.afterClosed().subscribe(
      () => this.consultarAtributosTratamiento(this.tratamientoSeleccionado.id)
    )

  }

  //FIN DIALOGOS 

  eliminarAtributo(atributoId : number){
    return this._atributoService.eliminarAtributo(atributoId).subscribe(
      ()=> {
        this.notificacion("Atributo creado con exito!", "exito-snackbar"),
        this.consultarAtributosTratamiento(this.tratamientoSeleccionado.id)
      }, 
      () => this.notificacion("ERROR creando tratamiento!", "fracaso-snackbar")
    )
  }

  consultarTratamientos() {
    this._tratamientoService.obtenerTratamientos().subscribe(
      result => {this.tratamientos = result})
  }

  consultarAtributosTratamiento(tratamiento_id : number){
    return this._atributoService.obtenerAtributosTratamiento(tratamiento_id).subscribe(
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

  seleccionarAtributos(tratamiento: TratamientoConsultar) {
    this.tratamientoSeleccionado = tratamiento;
    this.botonNuevoDeshabilitado = false;
    this.vaciarAtributos();
    this.consultarAtributosTratamiento(tratamiento.id);
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
