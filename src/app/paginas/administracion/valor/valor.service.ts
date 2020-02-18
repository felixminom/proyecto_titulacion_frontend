import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Valor, ValorCompleto } from './valor';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ValorService {

    constructor(
        private http: HttpClient) 
    {
    }

    url = environment.url + 'Valor/';

    obtenerValores(): Observable<Valor[]> {
        return this.http.get<Valor[]>(this.url).
            pipe(catchError(this.manejarError))
    }

    obtenerValoresAtributo(atributoId : number) : Observable<Valor[]>{
        return this.http.get<Valor[]>(
            this.url + 'Atributo/' + atributoId)
            .pipe(catchError(this.manejarError))
    }

    consultarValorCompleto(valorId :number): Observable<ValorCompleto>{
        return this.http.get<ValorCompleto>(
            this.url + "Completo/" + valorId
        ).pipe(catchError(this.manejarError))
    }

    private manejarError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            //Errores del lado del cliente
            alert('Ocurrio un error:' + error.error.message);
            return throwError(
                'Algo salio mal por favor intente de nuevo.');
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