import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioConsultar, UsuarioAsignar } from './usuario'
import { environment } from 'src/environments/environment';
import { Respuesta } from 'src/app/tipos';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  url = environment.url + 'Usuario/';
  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<UsuarioConsultar[]>{
    return this.http.get<UsuarioConsultar[]>(this.url);
  }

  obtenerUsuario(id: number):Observable<UsuarioConsultar>{
    return this.http.get<UsuarioConsultar>(this.url + id)
  }

  obtenerAnotadoresActivos(): Observable<UsuarioAsignar[]>{
    return this.http.get<UsuarioAsignar[]>(this.url + "AnotadoresActivos")
  }

  obtenerAdministradoresActivos(): Observable<UsuarioAsignar[]>{
    return this.http.get<UsuarioAsignar[]>(this.url + "AdministradoresActivos")
  }

  crearUsuario(usuarioAux) : Observable<Respuesta>{
    return this.http.post<Respuesta>(this.url, usuarioAux)
  }

  editarUsuario(usuarioAux) : Observable<Respuesta>{
    return this.http.patch<Respuesta>(this.url, usuarioAux)
  }

  eliminarUsuario(usuarioId) : Observable<Respuesta>{
    return this.http.delete<Respuesta>(this.url + usuarioId)
  }
}
