import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Anotacion, AnotacionNotificacionConsultar } from '../anotacion';
import { AnotacionService } from '../anotacion.service';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-notificacion-incosistencia',
  templateUrl: './notificacion-incosistencia.component.html',
  styleUrls: ['./notificacion-incosistencia.component.css']
})
export class NotificacionIncosistenciaComponent {

  anotacion : Anotacion;
  notificacion : AnotacionNotificacionConsultar;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data : any,
    private _anotacionService : AnotacionService,
    private _dialogoInterno : MatDialogRef<NotificacionIncosistenciaComponent>,
    private _notificacion: MatSnackBar
  ) { 
    this.anotacion = data.anotacion
    this.notificacion = data.notificacion
  }

  guardarAnotacion(){
    this._anotacionService.guardarAnotacion(this.anotacion).subscribe(
      () => {
        this.notificacionGuardado("Anotacion creada con exito!", "exito-snackbar")
        this._dialogoInterno.close(true)
      },
      () => this.notificacionGuardado("Error creando Anotacion!\nIntente nuevamente", "fracaso-snackbar")
    )
    
  }

  cancelar(){
    console.log("cancelando")
    this._dialogoInterno.close(false)
  }

  notificacionGuardado(mensaje: string, estilo: string) {
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      panelClass: [estilo],
      duration: 2000,
      verticalPosition: 'top'
    })
  }

}
