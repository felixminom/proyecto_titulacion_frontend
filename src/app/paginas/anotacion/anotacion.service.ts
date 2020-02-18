import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError} from 'rxjs';
import { Anotacion} from './anotacion'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnotacionService {

  url = environment.url + 'Anotacion/'
  httpOptions = {headers: new HttpHeaders({
    'Content-Type':'application/json',
    'observe': 'response'
  })};
  
  constructor(
    private http: HttpClient
  ) { }

  guardarAnotacion(anotacionAux : Anotacion){
    return this.http.post<any>(
      this.url, anotacionAux, this.httpOptions
    ).pipe(catchError(this.manejarError))
  }

  private manejarError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
        //Errores del lado del cliente
        console.error('Ocurrio un error:', error.error.message);
        return throwError(
            'Hubo un error, intente de nuevo.');
    }else{
        //Errroes del lado de backend
        if(error.status == 400){
            return throwError(
                'Revise que todos los campos esten completo');

        }else{
            return throwError(
                'Hubo un error por favor intente de nuevo');
        }
    }
  }

}
