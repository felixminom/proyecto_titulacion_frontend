import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Anotacion } from '../anotacion';
import { ValorService } from '../../administracion/valor/valor.service';
import { ValorCompleto } from '../../administracion/valor/valor';
import { AnotacionService } from '../anotacion.service';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

@Component({
  selector: 'app-comentario-anotacion',
  templateUrl: './comentario-anotacion.component.html',
  styleUrls: ['./comentario-anotacion.component.css']
})
export class ComentarioAnotacionComponent{

  listaAnotaciones : Anotacion[] = []
  anotacionActual : Anotacion;
  anotacionIndice = 0;
  totalAnotaciones = 0;
  guardarAnotacionAux = false;

  valorCompletoActual : ValorCompleto = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _valorService : ValorService,
    private _anotacionService : AnotacionService,
    private _dialogoInterno : MatDialogRef<ComentarioAnotacionComponent>,
    private _notificacion : MatSnackBar
  ) { 
    this.listaAnotaciones = data.listaAnotaciones
    this.anotacionActual = this.listaAnotaciones[this.anotacionIndice]
    this.consultarValorCompleto(this.anotacionActual.valor_id)
    this.totalAnotaciones = this.listaAnotaciones.length
  }

  anteriorAnotacion(){
    if (this.anotacionIndice != 0){
      this.anotacionIndice -= 1
      this.anotacionActual = this.listaAnotaciones[this.anotacionIndice]
      this.consultarValorCompleto(this.anotacionActual.valor_id)
      this.guardarAnotacionAux = false
    }

  }

  siguienteAnotacion(){
    if (this.anotacionIndice != this.totalAnotaciones -1){
      this.anotacionIndice += 1
      this.anotacionActual = this.listaAnotaciones[this.anotacionIndice]
      this.consultarValorCompleto(this.anotacionActual.valor_id)
    }else{
      this.guardarAnotacionAux = true;
    }
  }

  guardarAnotaciones(){
    this.listaAnotaciones.forEach(
      anotacion =>{
        this._anotacionService.guardarAnotacion(anotacion).subscribe(
          () => {
            this.notificacion("Anotacion creada con exito!", "exito-snackbar")
            this._dialogoInterno.close()
          },
          () => this.notificacion("ERROR creando anotacion!", "fracaso-snackbar")
        )
      }
    )
    this._dialogoInterno.close()
  }

  consultarValorCompleto(valorId: number){
    this._valorService.consultarValorCompleto(valorId).subscribe(
      resultado => this.valorCompletoActual = resultado,
      error => console.log(error)
    )
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
