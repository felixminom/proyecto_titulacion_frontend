import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Anotacion } from '../anotacion';
import { ValorService } from '../../administracion/valor/valor.service';
import { ValorCompleto } from '../../administracion/valor/valor';
import { error } from 'protractor';
import { runInThisContext } from 'vm';
import { AnotacionService } from '../anotacion.service';

@Component({
  selector: 'app-comentario-anotacion',
  templateUrl: './comentario-anotacion.component.html',
  styleUrls: ['./comentario-anotacion.component.css']
})
export class ComentarioAnotacionComponent implements OnInit {

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
    console.log(this.listaAnotaciones)
    this.listaAnotaciones.forEach(
      anotacion =>{
        this._anotacionService.guardarAnotacion(anotacion).subscribe(
          resultado => console.log(resultado),
          error => alert(error)
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

  ngOnInit() {
  }

}
