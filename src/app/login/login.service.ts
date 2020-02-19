import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Auth } from './login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logeado: boolean = false;

  url = environment.url + 'auth/'

  constructor(private readonly _router: Router,
    private readonly http: HttpClient) {

  }

  estaLogeado() {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
    
  }

  login(usuario: string, contrasena: string): Observable<Auth> {
    let user = {
      "email": usuario,
      "clave": contrasena
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'observe': 'response'
      })
    };
    
    return this.http.post<Auth>(this.url + "login", user, httpOptions)
    .pipe(catchError(this.manejarError))

  }

  logout() {
    console.log('saliendo');
    this.logeado = false;
  }

  private manejarError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Errores del lado del cliente
      return throwError(
        'Somethingbad happened ; please try again later.');
    } else {
      //Errroes del lado de backend
      if (error.status == 401) {
        return throwError(
          'Usuario o contraseña no son correctos');

      } else {
        return throwError(
          'Hubo un error por favor intente de nuevo');
      }
    }
  }
}