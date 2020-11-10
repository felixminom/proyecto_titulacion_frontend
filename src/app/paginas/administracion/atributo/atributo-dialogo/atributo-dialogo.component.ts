import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { Atributo, AtributoGuardar, AtributoEditar } from '../atributo';
import { AtributoService } from '../atributo.service';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

@Component({
  selector: 'app-atributo-dialogo',
  templateUrl: './atributo-dialogo.component.html',
  styleUrls: ['./atributo-dialogo.component.css']
})
export class AtributoDialogoComponent implements OnInit {

  atributoAux : Atributo;
  formulario: FormGroup;
  nuevo:boolean;
  titulo:string;

  constructor(
    private fb: FormBuilder,
    private _atributoService : AtributoService,
    private _notificacion : MatSnackBar,
    private _dialogoInterno : MatDialogRef<AtributoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.atributoAux = data.atributo
    this.formulario = this.crearFormulario(this.atributoAux);
    this.nuevo = data.nuevo;
    if (this.nuevo) {
      this.titulo = 'Creación de Atributo'
    } else {
      this.titulo = 'Edición de Atributo'
    }
  }

  crearFormulario(atributoAux : Atributo) {
    return this.fb.group({
      descripcion: new FormControl(atributoAux.descripcion, [Validators.required]),
    })
  }

  guardarAtributo(atributoAux : AtributoGuardar){
    return this._atributoService.crearAtributo(atributoAux).subscribe(
      ()=>  {
        this.notificacion("Atributo creado con éxito!", "exito-snackbar")
        this._dialogoInterno.close()
      },
      () => this.notificacion("ERROR creando tratamiento!", "fracaso-snackbar")
    )
  }

  editarAtributo(atributoAux : AtributoEditar){
    return this._atributoService.editarAtributo(atributoAux).subscribe(
      ()=>  {
        this.notificacion("Atributo editado con éxito!", "exito-snackbar")
        this._dialogoInterno.close()
      },
      () => this.notificacion("ERROR editando tratamiento!", "fracaso-snackbar")
    )
  }

  guardar(){
    if(this.formulario.valid){
      if(this.nuevo){
        let atributoNuevo : AtributoGuardar= {
          tratamiento_id : this.atributoAux.tratamiento_id,
          descripcion : this.formulario.value.descripcion
        }
        this.guardarAtributo(atributoNuevo)
      }else{
        let atributoEditar : AtributoEditar= {
          id : this.atributoAux.id,
          descripcion : this.formulario.value.descripcion
        }
        this.editarAtributo(atributoEditar)
      }
    }else{
      alert("El formulario contiene errores, por favor revíselo.")
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

  ngOnInit() {
  }
}
