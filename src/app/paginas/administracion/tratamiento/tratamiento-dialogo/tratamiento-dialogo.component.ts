import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Tratamiento } from '../tratamiento';
import { PaletaColoresComponent } from './paleta-colores/paleta-colores.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Color } from './paleta-colores/color';

@Component({
  selector: 'app-tratamiento-dialogo',
  templateUrl: './tratamiento-dialogo.component.html',
  styleUrls: ['./tratamiento-dialogo.component.css']
})
export class TratamientoDialogoComponent {

  nuevo: boolean;
  titulo: string;
  formulario: FormGroup;

  tratamientoAux: Tratamiento = {
    id: null,
    descripcion: '',
    color_primario: ''
  }

  color: Color = {
    id: null,
    codigo: '',
    disponible: false
  }

  constructor(
    private fb: FormBuilder,
    private openDialog: MatDialog,
    private dialog: MatDialogRef<TratamientoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
    this.tratamientoAux = data.datos
    this.color.codigo = data.datos.color_primario;
    this.formulario = this.crearFormulario(this.tratamientoAux, this.color);
    this.nuevo = data.nuevo;
    if (this.nuevo) {
      this.titulo = 'Creación de Tratamiento'
    } else {
      this.titulo = 'Edicion de Tratamiento'
    }
    
  }

  crearFormulario(tratamientoAux : Tratamiento, colorAux : Color) {
    return new FormGroup({
      descripcion: new FormControl(tratamientoAux.descripcion, [Validators.required]),
      color_primario_string : new FormControl (tratamientoAux.color_primario, [Validators.required]),
      color_primario: new FormControl(colorAux.id,[Validators.required])
    })
  }

  resetFormulario(){
    this.formulario.reset()
  }

  onNoClick(): void {
    this.dialog.close();
  }

  estiloAnotacion(colorAux): Object {
    return {
      'color': colorAux,
      'font-weight': 'bold'
    }
  }

  colorPicker(colorOriginal: string){
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
    if (this.nuevo) {
      console.log('creando nuevo tratamiento')
      console.log(this.formulario.value)
    } else {
      console.log('editando nuevo tratamiento')
      console.log(this.formulario.value)
    }

  }

}
