import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Tratamiento } from '../tratamiento';
import { PaletaColoresComponent } from './paleta-colores/paleta-colores.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Color } from './paleta-colores/color';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tratamiento-dialogo',
  templateUrl: './tratamiento-dialogo.component.html',
  styleUrls: ['./tratamiento-dialogo.component.css']
})
export class TratamientoDialogoComponent implements OnInit {

  ngOnInit() {
  }

  constructor(
    private fb: FormBuilder,
    private openDialog: MatDialog,
    public dialog: MatDialogRef<TratamientoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formulario = this.crearFormulario();
    this.elemento = data.datos
    this.elemento.descripcion = data.datos.descripcion
    this.color.codigo = data.datos.color_primario;
    this.nuevo = data.nuevo;
    if (this.nuevo) {
      this.titulo = 'Creación de Tratamiento'
    } else {
      this.titulo = 'Edicion de Tratamiento'
    }
  }


  elemento: Tratamiento = {
    id: null,
    descripcion: '',
    color_primario: ''
  }

  color: Color = {
    id: null,
    codigo: '',
    disponible: false
  }
  nuevo: boolean;
  titulo: string;
  formulario: FormGroup;

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
    this.elemento.descripcion = this.formulario.value.descripcion
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
        this.elemento.color_primario = this.color.codigo
        this.formulario = this.fb.group({
          descripcion: [this.elemento.descripcion,[]],
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
