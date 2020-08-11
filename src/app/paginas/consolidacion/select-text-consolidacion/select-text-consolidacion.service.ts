import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnotacionService } from '../../anotacion/anotacion.service';
import { totalAnotaciones } from '../../anotacion/anotacion';

@Injectable({
  providedIn: 'root'
})
export class SelectTextConsolidacionService {
  
  parrafoId  = new BehaviorSubject<number>(0);
  texto = new  BehaviorSubject<string>("");
  textoHtml = new  BehaviorSubject<string>("");

  numeroAnotacionesParrafo  = new BehaviorSubject<number>(0);

  constructor(
    private _anotacionService : AnotacionService
  ) { }

  obtenerParrafoId(){
    return this.parrafoId.asObservable();
  }

  colocarParrafoId(parrafoId : number){
    this.parrafoId.next(parrafoId)
  }

  obtenerTexto(){
    return this.texto.asObservable();
  }

  obtenerTextoHmtl(){
    return this.texto.asObservable();
  }

  colocarTexto(texto : string){ 
    this.texto.next(texto)
  }

  colocarTextoHtml(textoHtml : string){ 
    this.textoHtml.next(textoHtml)
  }

  consultarTotalAnotacionesConsolidadorParrafo(parrafoId: number, usuarioId : number){
    this._anotacionService.obtenerTotalAnotacionesParrafo(parrafoId,usuarioId,true).subscribe(
     (resultado : totalAnotaciones)=> this.numeroAnotacionesParrafo.next(resultado.num_anotaciones),
     error => console.log(error)
    )

    return this.numeroAnotacionesParrafo;
  }

  obtenerNumeroAnotacionParrafo(){
    return this.numeroAnotacionesParrafo.asObservable();
  }
}
