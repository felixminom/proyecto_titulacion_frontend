import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Anotacion, totalAnotaciones, UsuarioAnotacion} from './anotacion'
import { AnotacionResultado } from './anotacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnotacionService {

  url = environment.url + 'Anotacion/'
  constructor(
    private http: HttpClient
  ) { }

  guardarAnotacion(anotacionAux : Anotacion){
    return this.http.post(this.url, anotacionAux)
  }

  eliminarAnotacion(anotacionId : number){
    return this.http.delete(this.url + anotacionId)
  }

  obtenerAnotacionesAnotadores(politica_id: number, secuencia: number): Observable<AnotacionResultado> {
    let anotacionesParrafo = {
      politica_id: politica_id,
      secuencia: secuencia
    }
    return this.http.post<AnotacionResultado>(this.url + "Usuario", anotacionesParrafo)
  }
  
  obtenerTotalAnotacionesAnotadorParrafo(parradoId : number, usuarioId: number): Observable<totalAnotaciones>{
    let usuarioParrafo = {
      usuario_id : usuarioId,
      parrafo_id : parradoId
    }
    return this.http.post<totalAnotaciones>(this.url + "Total/Anotador", usuarioParrafo)
  }

  obtenerAnotacionesAnotadorParrafo(parradoId : number, usuarioId: number): Observable<UsuarioAnotacion[]>{
    let usuarioParrafo = {
      usuario_id : usuarioId,
      parrafo_id : parradoId
    }
    return this.http.post<UsuarioAnotacion[]>(this.url + "Anotador/Parrafo", usuarioParrafo)
  }
}
