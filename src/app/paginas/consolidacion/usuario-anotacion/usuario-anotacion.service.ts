import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnotacionResultado } from './usuario-anotacion'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioAnotacionService {
  url = environment.url + "Anotacion/"
  constructor(
    private http: HttpClient) { }

  obtenerAnotacionesAnotadores(politica_id: number, secuencia: number): Observable<AnotacionResultado> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'observe': 'response'
      })
    };

    let payload = {
      politica_id: politica_id,
      secuencia: secuencia
    }
    return this.http.post<AnotacionResultado>(
      this.url + "Usuario", payload, httpOptions
    )
  }
}
