import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

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

    return this.http.post<Auth>(this.url + "login", user)

  }

  logout() {
    let token : string = localStorage.getItem('token')

    let headers = new HttpHeaders({'Authorization': token})
    
    return this.http.get(this.url + "logout", {headers : headers})
  }

}