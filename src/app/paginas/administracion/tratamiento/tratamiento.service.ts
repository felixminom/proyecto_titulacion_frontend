import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TratamientoConsultar, TratamientoGuardar, TratamientoEditar } from './tratamiento';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { TratamientoNodo } from 'src/app/paginas/anotacion/tree-view-check/tree-view-check.component';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  url = environment.url + 'Tratamiento/';

  constructor(
    private http: HttpClient) { }


  obtenerTratamientos(): Observable<TratamientoConsultar[]> {
    return this.http.get<TratamientoConsultar[]>(this.url).
      pipe(catchError(this.manejarError))
  }

  obtenerTratamientosCompletos(): Observable<TratamientoNodo[]> {
    return this.http.get<TratamientoNodo[]>(this.url + "TratamientosCompletos").
      pipe(catchError(this.manejarError))
  }

  obtenerTratamientoId(tratamientoId: number): Observable<TratamientoConsultar> {
    return this.http.get<TratamientoConsultar>(
      this.url + tratamientoId
    ).pipe(catchError(this.manejarError))
  }

  crearTratamiento(tratamiento: TratamientoGuardar): Observable<TratamientoConsultar> {
    return this.http.post<TratamientoConsultar>(
      this.url, tratamiento
    );
  }

  editarTratamiento(tratamiento: TratamientoEditar){
    return this.http.patch(this.url, tratamiento)
  }

  eliminarTratamiento(tratamientoId : number){
    return this.http.delete(this.url + tratamientoId)

  }



  private manejarError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Errores del lado del cliente
      console.error('Ocurrio un error:', error.error.message);
      return throwError(
        'Somethingbad happened ; please try again later.');
    } else {
      //Errroes del lado de backend
      if (error.status == 404) {
        return throwError(
          'No existen valores para este atributo');

      } else {
        return throwError(
          'Hubo un error por favor intente de nuevo');
      }
    }
  }
}
