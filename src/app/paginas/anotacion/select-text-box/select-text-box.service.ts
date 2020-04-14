import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnotacionService } from '../anotacion.service';
import { totalAnotaciones } from '../anotacion';

@Injectable({
  providedIn: 'root'
})
export class SelectTextBoxService {

  texto = new  BehaviorSubject<string>("");
  textoHtml = new  BehaviorSubject<string>("");

  numeroAnotacionesParrafo  = new BehaviorSubject<number>(0);

  permite = new BehaviorSubject<boolean>(true);

  constructor(
    private _anotacionService : AnotacionService
  ) { }

  obtenerTexto(){
    return this.texto.asObservable();
  }

  obtenerTextoHmtl(){
    return this.textoHtml.asObservable();
  }

  public colocarTexto(texto : string){ 
    this.texto.next(texto)
  }

  public colocarTextoHtml(textoHtml : string){ 
    this.textoHtml.next(textoHtml)
  }

  obtenerPermite(){
    return this.permite.asObservable();
  }
  
  colocarPermite(permite : boolean){
    this.permite.next(permite)
  }

  consultarTotalAnotacionesAnotadorParrafoServicio(parrafoId: number, usuarioId : number){
    this._anotacionService.obtenerTotalAnotacionesParrafo(parrafoId,usuarioId,false).subscribe(
     (resultado : totalAnotaciones)=> this.numeroAnotacionesParrafo.next(resultado.num_anotaciones),
     error => console.log(error)
    )

    return this.numeroAnotacionesParrafo;
  }

  obtenerNumeroAnotacionParrafo(){
    return this.numeroAnotacionesParrafo.asObservable();
  }

}
