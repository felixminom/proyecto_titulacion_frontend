import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Atributo, Respuesta } from './atributo';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class AtributoService {

    constructor(
        private http: HttpClient) { }

    url = environment.url + 'Atributo/';

    obtenerTodosAtributos(): Observable<Atributo[]> {
        return this.http.get<Atributo[]>(
            this.url).pipe(catchError(this.manejarError))
    }

    obtenerAtributosTratamiento(tratamientoId: number): Observable<Atributo[]> {
        return this.http.get<Atributo[]>(
            this.url + 'Tratamiento/' + tratamientoId
        ).pipe(catchError(this.manejarError))
    }

    obtenerAtributo(atributoId: number): Observable<Atributo> {
        return this.http.get<Atributo>(
            this.url + atributoId)
            .pipe(catchError(this.manejarError))
    }

    crearAtributo(atributo: Atributo): Observable<HttpResponse<Respuesta>> {
        return this.http.post<Respuesta>(
            this.url, atributo, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            observe: 'response'
        }).pipe(catchError(this.manejarError));
    }

    private manejarError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            //Errores del lado del cliente
            console.error('Ocurrio un error:', error.error.message);
            return throwError(
                'Somethingbad happened ; please try again later.');
        } else {
            alert(JSON.stringify(error.error.mensaje))

            return throwError(
                'Hubo un error por favor intente de nuevo');

        }
    }


}
