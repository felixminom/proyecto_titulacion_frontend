import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Tratamiento } from '../tratamiento';
import { PaletaColoresComponent } from './paleta-colores/paleta-colores.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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
    public dialog: MatDialogRef<TratamientoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) 
    {
    this.formulario = this.crearFormulario();
    this.tratamientoAux = data.datos
    this.color.codigo = data.datos.color_primario;
    this.nuevo = data.nuevo;
    if (this.nuevo) {
      this.titulo = 'Creación de Tratamiento'
    } else {
      this.titulo = 'Edicion de Tratamiento'
    }
    
  }

  crearFormulario() {
    return new FormGroup({
      descripcion: new FormControl(''),
      color_primario: new FormControl('')
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

  colorPicker(colorOriginal: string): any {
    this.tratamientoAux.descripcion = this.formulario.value.descripcion
    const dialogoEditarColor = new MatDialogConfig();

    dialogoEditarColor.autoFocus = true;
    dialogoEditarColor.width = '30%';
    dialogoEditarColor.height = '85%',
      dialogoEditarColor.data = { color_primario: colorOriginal };

    const dialagoEditarColorAbierto = this.openDialog.open(PaletaColoresComponent, dialogoEditarColor);

    dialagoEditarColorAbierto.afterClosed().subscribe(
      result => {
        this.color.codigo = result.color_primario
        this.color.id = result.id
        this.tratamientoAux.color_primario = this.color.codigo
        this.formulario = this.fb.group({
          descripcion: [this.tratamientoAux.descripcion,[]],
          color_primario: [this.color.id, []],
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
