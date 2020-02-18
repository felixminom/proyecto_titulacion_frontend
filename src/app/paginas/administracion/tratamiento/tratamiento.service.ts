import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Tratamiento} from './tratamiento';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import {TodoItemNode} from 'src/app/paginas/anotacion/tree-view-check/tree-view-check.component';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  url = environment.url + 'Tratamiento/';
  
  constructor(
    private http: HttpClient) {}



  obtenerTratamientos(): Observable<Tratamiento[]>{
    return this.http.get<Tratamiento[]>(this.url).
    pipe(catchError(this.manejarError))
  }

  obtenerTratamientosCompletos(): Observable<TodoItemNode[]>{
    return this.http.get<TodoItemNode[]>(this.url + "TratamientosCompletos").
    pipe(catchError(this.manejarError))
  }

  obtenerTratamientoId(tratamientoId : number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(
      this.url + tratamientoId
    ).pipe(catchError(this.manejarError))
  }



  crearTratamiento(tratamiento : Tratamiento): Observable<Tratamiento>{
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type':'application/json',
      'observe': 'response'
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

  private manejarError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
        //Errores del lado del cliente
        console.error('Ocurrio un error:', error.error.message);
        return throwError(
            'Somethingbad happened ; please try again later.');
    }else{
        //Errroes del lado de backend
        if(error.status == 404){
            return throwError(
                'No existen valores para este atributo');

        }else{
            return throwError(
                'Hubo un error por favor intente de nuevo');
        }
    }
  }
}
