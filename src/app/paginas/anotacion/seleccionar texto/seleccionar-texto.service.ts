import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnotacionService } from '../anotacion.service';
import { totalAnotaciones } from '../anotacion';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SelectTextBoxService {

  private texto = new  BehaviorSubject<string>("");
  private textoHtml = new  BehaviorSubject<string>("");

  private numeroAnotacionesParrafo  = new BehaviorSubject<number>(0);

  constructor(
    private _anotacionService : AnotacionService,
    @Inject(DOCUMENT) private documento: Document,
  ) { }

  public obtenerTexto(){
    return this.texto
  }

  public obtenerTextoHmtl(){
    return this.textoHtml
  }

  public colocarTexto(texto : string){ 
    this.texto.next(texto)
  }

  public colocarTextoHtml(textoHtml : string){ 
    this.textoHtml.next(textoHtml)
    let input = this.documento.getElementById("seleccion");
    input.innerHTML = textoHtml
  }

  public consultarTotalAnotacionesAnotadorParrafoServicio(parrafoId: number, usuarioId : number){
    this._anotacionService.obtenerTotalAnotacionesParrafo(parrafoId,usuarioId,false).subscribe(
     (resultado : totalAnotaciones)=> this.numeroAnotacionesParrafo.next(resultado.num_anotaciones),
     error => console.log(error)
    )

    return this.numeroAnotacionesParrafo;
  }

  public obtenerNumeroAnotacionParrafo(){
    return this.numeroAnotacionesParrafo
  }
}
