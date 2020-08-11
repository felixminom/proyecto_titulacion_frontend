import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnotacionService } from '../anotacion.service';
import { totalAnotaciones } from '../anotacion';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SelectTextBoxService {

  texto = new  BehaviorSubject<string>("");
  textoHtml = new  BehaviorSubject<string>("");

  numeroAnotacionesParrafo  = new BehaviorSubject<number>(0);

  constructor(
    private _anotacionService : AnotacionService,
    @Inject(DOCUMENT) private documento: Document,
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
    let input = this.documento.getElementById("seleccion");
    input.innerHTML = textoHtml
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
