import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Tratamiento } from '../tratamiento';
import { PaletaColoresComponent } from './paleta-colores/paleta-colores.component';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-tratamiento-dialogo',
  templateUrl: './tratamiento-dialogo.component.html',
  styleUrls: ['./tratamiento-dialogo.component.css']
})
export class TratamientoDialogoComponent implements OnInit   {

  elemento: Tratamiento;
  titulo: string;
  formulario: FormGroup;

  ngOnInit(){
    this.formulario = this.fb.group ({
      descripcion : [{value: this.elemento.descripcion}],
      color_primario: [{value: this.elemento.color_primario, disabled:true}, []]
    })
  }

  constructor(
    private fb: FormBuilder,
    private openDialog: MatDialog,
    public dialog: MatDialogRef<TratamientoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.elemento = data.datos;
    this.titulo = 'Edicion de Tratamientos'
  }

  onNoClick(): void {
    this.dialog.close();
  }

  estiloAnotacion(colorAux):Object{
    return {
      'color': colorAux,
      'font-weight': 'bold'
    }
  }

  colorPicker(colorOriginal: string): any {
    const dialogoEditarColor = new MatDialogConfig();

    dialogoEditarColor.autoFocus = true;
    dialogoEditarColor.width = '30%';
    dialogoEditarColor.height = '85%',
    dialogoEditarColor.data = {color_primario: colorOriginal};

    const dialagoEditarColorAbierto = this.openDialog.open(PaletaColoresComponent, dialogoEditarColor );

    dialagoEditarColorAbierto.afterClosed().subscribe(
      result=>{ 
        console.log(result)
        this.elemento.color_primario = result.color_primario
    });
    }

    guardar() {
     this.dialog.close(this.formulario.value);
    }

}
