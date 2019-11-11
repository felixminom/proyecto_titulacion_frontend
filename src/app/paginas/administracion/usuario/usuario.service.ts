import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from './usuario'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  url = environment.url + 'Usuario/';
  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.url);
  }

  /*getTreatmentById(tratamientoId : number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(
      this.url + tratamientoId
    );
  }

  createTreatment(tratamiento : Tratamiento): Observable<Tratamiento>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type':'application/json'
    })};
    return this.http.post<Tratamiento>(
      this.url, tratamiento, httpOptions
    );
  }

  editTreatment(tratamiento : Tratamiento): Observable<Tratamiento>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};
    return this.http.put<Tratamiento>(
      this.url + tratamiento.id, tratamiento, httpOptions)
  }*/
}
