import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tratamiento} from './tratamiento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  url = environment.url + 'Tratamiento/';
  constructor(private http: HttpClient) {}

  obtenerTratamientos(): Observable<Tratamiento[]>{
    return this.http.get<Tratamiento[]>(this.url);
  }

  obtenerTratamientoId(tratamientoId : number): Observable<Tratamiento> {
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

  editarTratamiento(tratamiento : Tratamiento): Observable<Tratamiento>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};
    return this.http.put<Tratamiento>(
      this.url + tratamiento.id, tratamiento, httpOptions)
  }
}
