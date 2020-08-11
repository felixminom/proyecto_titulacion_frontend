import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Anotacion, totalAnotaciones, UsuarioAnotacion, AnotacionEditar, AnotacionNotificacion, DetallesAnotacion, AnotacionNotificacionConsultar } from './anotacion'
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

  guardarAnotacion(anotacionAux: Anotacion) {
    return this.http.post(this.url, anotacionAux)
  }

  editarAnotacion(anotacionAux: AnotacionEditar) {
    return this.http.patch(this.url, anotacionAux)
  }

  eliminarAnotacion(anotacionId: number) {
    return this.http.delete(this.url + anotacionId)
  }

  notificacionAnotacion(anotacionNotificacionAux: AnotacionNotificacion): Observable<AnotacionNotificacionConsultar> {
    return this.http.post<AnotacionNotificacionConsultar>(this.url + 'Notificacion', anotacionNotificacionAux)
  }

  obtenerAnotacionesAnotadores(politica_id: number, secuencia: number): Observable<AnotacionResultado> {
    let anotacionesParrafo = {
      politica_id: politica_id,
      secuencia: secuencia
    }
    return this.http.post<AnotacionResultado>(this.url + "Usuario", anotacionesParrafo)
  }

  obtenerTotalAnotacionesParrafo(parradoId: number, usuarioId: number, consolidar: boolean): Observable<totalAnotaciones> {
    let usuarioParrafo = {
      usuario_id: usuarioId,
      parrafo_id: parradoId,
      consolidar: consolidar
    }
    return this.http.post<totalAnotaciones>(this.url + "Total/Anotador", usuarioParrafo)
  }

  obtenerAnotacionesUsuarioParrafo(parradoId: number, usuarioId: number, consolidar: boolean): Observable<UsuarioAnotacion[]> {
    let usuarioParrafo = {
      usuario_id: usuarioId,
      parrafo_id: parradoId,
      consolidar: consolidar
    }
    return this.http.post<UsuarioAnotacion[]>(this.url + "Usuario/Parrafo", usuarioParrafo)
  }

  //consulta el nivel de concordancia y numero de anotaciones por 
  obtenerDetallesAnotacionPolitica(politica_id: number): Observable<DetallesAnotacion> {
    let politica = {
      politica_id: politica_id
    }
    return this.http.post<DetallesAnotacion>(this.url + "Detalles", politica)
  }
}
