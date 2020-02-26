import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsuarioConsultar, UsuarioGuardar, UsuarioAsignar} from './usuario'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  url = environment.url + 'Usuario/';
  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<UsuarioConsultar[]>{
    return this.http.get<UsuarioConsultar[]>(this.url);
  }

  obtenerAnotadoresActivos(): Observable<UsuarioAsignar[]>{
    return this.http.get<UsuarioAsignar[]>(this.url + "AnotadoresActivos")
  }

  obtenerAdministradoresActivos(): Observable<UsuarioAsignar[]>{
    return this.http.get<UsuarioAsignar[]>(this.url + "AdministradoresActivos")
  }

  crearUsuario(usuarioAux){
    return this.http.post(this.url, usuarioAux)
  }

  editarUsuario(usuarioAux){
    return this.http.patch(this.url, usuarioAux)
  }

  eliminarUsuario(usuarioId){
    return this.http.delete(this.url + usuarioId)
  }
}
