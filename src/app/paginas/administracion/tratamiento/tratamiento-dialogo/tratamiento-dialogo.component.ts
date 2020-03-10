import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TratamientoConsultar, TratamientoGuardar, TratamientoEditar } from '../tratamiento';
import { PaletaColoresComponent } from './paleta-colores/paleta-colores.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Color } from './paleta-colores/color';
import { TratamientoService } from '../tratamiento.service';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tratamiento-dialogo',
  templateUrl: './tratamiento-dialogo.component.html',
  styleUrls: ['./tratamiento-dialogo.component.css']
})
export class TratamientoDialogoComponent {

  nuevo: boolean;
  titulo: string;
  formulario: FormGroup;

  tratamientoAux: TratamientoConsultar = {
    id: null,
    descripcion: null,
    color_id: 0,
    color_primario_codigo: ''
  }

  constructor(
    private fb: FormBuilder,
    private openDialog: MatDialog,
    private _dialogoInterno: MatDialogRef<TratamientoDialogoComponent>,
    private _tratamientoService : TratamientoService,
    private _notificacion : MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
    this.tratamientoAux = data.tratamientoAux
    this.formulario = this.crearFormulario(this.tratamientoAux);
    this.nuevo = data.nuevo;
    if (this.nuevo) {
      this.titulo = 'Creación de Tratamiento'
    } else {
      this.titulo = 'Edicion de Tratamiento'
    }

  }

  crearFormulario(tratamientoAux: TratamientoConsultar) {
    return new FormGroup({
      descripcion: new FormControl(tratamientoAux.descripcion, [Validators.required]),
      color_primario_string: new FormControl(tratamientoAux.color_primario_codigo, [Validators.required]),
      color_primario: new FormControl(tratamientoAux.color_id, [Validators.required])
    })
  }

  guardarTratamiento(tratamientoAux : TratamientoGuardar){
    if (this.formulario.valid){
      return this._tratamientoService.crearTratamiento(tratamientoAux).subscribe(
        () =>{
          this.notificacion("Tratamiento creado con exito!", "exito-snackbar")
          this._dialogoInterno.close()
        }, 
        () => this.notificacion("Error creando tratamiento!", "fracaso-snackbar") 
      )
    }else{
      alert("El formulario contiene errores.\nPor favor revíselo")
    }
    
  }

  editarTratamiento(tratamientoAux : TratamientoEditar){
    return this._tratamientoService.editarTratamiento(tratamientoAux).subscribe(
      () =>{
        this.notificacion("Tratamiento editado con exito!", "exito-snackbar")
        this._dialogoInterno.close()
      }, 
      () => this.notificacion("Error editando tratamiento!", "fracaso-snackbar") 
    )
  }

  resetFormulario() {
    this.formulario.reset()
  }

  onNoClick(): void {
    this._dialogoInterno.close();
  }

  estiloAnotacion(colorAux): Object {
    return {
      'color': colorAux,
      'font-weight': 'bold'
    }
  }

  colorPicker(colorOriginal: string) {
    const dialogoEditarColor = new MatDialogConfig();

    dialogoEditarColor.autoFocus = true;
    dialogoEditarColor.width = '30%';
    dialogoEditarColor.height = '85%',
      dialogoEditarColor.data = { color_primario: colorOriginal };

    const dialagoEditarColorAbierto = this.openDialog.open(PaletaColoresComponent, dialogoEditarColor);

    dialagoEditarColorAbierto.afterClosed().subscribe(
      result => {
        this.formulario = this.fb.group({
          descripcion: [this.formulario.value.descripcion],
          color_primario_string: [result.color_primario],
          color_primario: [result.id],
        })
      });
  }

  guardar() {
    if (this.formulario.valid) {
      if (this.nuevo) {
        let tratamiento : TratamientoGuardar= {
          descripcion: this.formulario.value.descripcion,
          color_primario: this.formulario.value.color_primario
        }
        this.guardarTratamiento(tratamiento)
      } else {
        let tratamiento : TratamientoEditar= {
          id : this.tratamientoAux.id,
          descripcion: this.formulario.value.descripcion,
          color_primario: this.formulario.value.color_primario
        }
        this.editarTratamiento(tratamiento)
       
      }

    }else{
      alert("El formulario contiene errores, por favor revíselo")
    }
  }

  notificacion(mensaje : string, estilo : string){
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      panelClass: [estilo],
      duration: 2000,
      verticalPosition: 'top'
    })
  }

}
