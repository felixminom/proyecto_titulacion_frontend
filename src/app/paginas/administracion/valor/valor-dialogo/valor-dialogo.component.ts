import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { ValorGuardar, Valor, ValorEditar } from '../valor';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ValorService } from '../valor.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

@Component({
  selector: 'app-valor-dialogo',
  templateUrl: './valor-dialogo.component.html',
  styleUrls: ['./valor-dialogo.component.css']
})
export class ValorDialogoComponent implements OnInit {

  valor : Valor;
  nuevo : boolean;
  titulo : string;

  formulario : FormGroup;

  constructor(
    private _fb : FormBuilder,
    private _valorService : ValorService,
    private _notificacion : MatSnackBar,
    private _dialogoInterno : MatDialogRef<ValorDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data : any
    ) { 
      this.valor = data.valor
      this.nuevo = data.nuevo
      this. formulario = this.crearFormulario(this.valor)
      if (this.nuevo){
        this.titulo = "Creación de Valor"
      }else{
        this.titulo = "Edición de Valor"
      }
    }

    
  crearFormulario(valorAux : ValorGuardar) {
    return this._fb.group({
      descripcion: new FormControl(valorAux.descripcion, [Validators.required]),
    })
  }

  guardarValor(valorAux : ValorGuardar){
    this._valorService.crearValor(valorAux).subscribe(
      ()=> {
        this.notificacion("Valor creado con éxito!", "exito-snackbar")
        this._dialogoInterno.close()
      },
      () => this.notificacion("ERROR creando valor!", "fracaso-snackbar")
    )
  }

  editarValor(valorAux : ValorEditar){
    this._valorService.editarValor(valorAux).subscribe(
      ()=> {
        this.notificacion("Valor editado con éxito!", "exito-snackbar")
        this._dialogoInterno.close()
      },
      () => this.notificacion("ERROR editando valor!", "fracaso-snackbar")
    )
  }

  guardar(){
    if(this.formulario.valid){
      if(this.nuevo){
        let valorGuardar : ValorGuardar = {
          descripcion : this.formulario.value.descripcion,
          atributo_id : this.valor.atributo_id
        }
        this.guardarValor(valorGuardar)
      }else{
        let valorEditar : ValorEditar = {
          id: this.valor.id,
          descripcion : this.formulario.value.descripcion
        }
        this.editarValor(valorEditar)
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
