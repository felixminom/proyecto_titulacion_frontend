import { Injectable } from '@angular/core';
import { AnotacionResultado } from '../../anotacion/anotacion';
import { BehaviorSubject } from 'rxjs';
import { AnotacionService } from '../../anotacion/anotacion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAnotacionService {

  anotaciones = new BehaviorSubject<AnotacionResultado>(new AnotacionResultado(false,[]));

  constructor(
    private _usuarioAnotacionService : AnotacionService
  ) { }

  consultarAnotacionesParrafo(politicaId :number, secuencia :number) {
    this._usuarioAnotacionService.obtenerAnotacionesAnotadores(politicaId, secuencia).subscribe(
      (resultado: AnotacionResultado) => {
        this.anotaciones.next(resultado)
      },
      error => console.log(error)
    )
  }

  obtenerAnotaciones(){
    return this.anotaciones.asObservable();
  }

}
