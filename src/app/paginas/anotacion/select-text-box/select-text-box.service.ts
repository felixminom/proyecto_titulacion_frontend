import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { runInThisContext } from 'vm';
import { AnotacionService } from '../anotacion.service';
import { totalAnotaciones } from '../anotacion';

@Injectable({
  providedIn: 'root'
})
export class SelectTextBoxService {

  texto = new  BehaviorSubject<string>("");
  textoHtml = new  BehaviorSubject<string>("");

  numeroAnotacionesParrafo  = new BehaviorSubject<number>(0);

  constructor(
    private _anotacionService : AnotacionService
  ) { }

  obtenerTexo(){
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

  consultarTotalAnotacionesAnotadorParrafoServicio(parrafoId: number, usuarioId : number){
    this._anotacionService.obtenerTotalAnotacionesAnotadorParrafo(parrafoId,usuarioId).subscribe(
     (resultado : totalAnotaciones)=> this.numeroAnotacionesParrafo.next(resultado.num_anotaciones),
     error => console.log(error)
    )
  }

  obtenerNumeroAnotacionParrafo(){
    return this.numeroAnotacionesParrafo.asObservable();
  }

}
