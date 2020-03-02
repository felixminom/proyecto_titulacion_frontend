import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { PoliticaGuardar, RespuestaPoliticaVisualizar, PoliticaAnotarConsultar, PoliticaVisualizar, PoliticaConsultar } from './politica'
import { UsuarioLogin } from 'src/app/login/login'
import { UsuarioAsignar } from '../usuario/usuario';


@Injectable({
  providedIn: 'root'
})
export class PoliticaService {

  url = environment.url + 'Politica/';
  usuarioAux: UsuarioLogin = null;


  constructor(
    private http: HttpClient
  ) { }

  previsualizacionPolitica(politicaAux: PoliticaGuardar, archivo: File):Observable<RespuestaPoliticaVisualizar> {
    const formData: FormData = new FormData();
    formData.append('politica', archivo);
    formData.append('nombre', politicaAux.nombre);
    formData.append('url', politicaAux.url)
    formData.append('fecha', politicaAux.fecha)
    return this.http.post<RespuestaPoliticaVisualizar>(this.url + "Previsualizacion", formData)
  }

  guardarPolitica(politicaAux: PoliticaGuardar, archivo: File):Observable<RespuestaPoliticaVisualizar> {
    const formData: FormData = new FormData();
    formData.append('politica', archivo);
    formData.append('nombre', politicaAux.nombre);
    formData.append('url', politicaAux.url)
    formData.append('fecha', politicaAux.fecha)
    return this.http.post<RespuestaPoliticaVisualizar>(this.url , formData)
  }

  editarPolitica(politicaAux : PoliticaConsultar){
    return this.http.patch(this.url, politicaAux)
  }

  editarPoliticaAsignada(politicaId : number){
    let politica = {
      id : politicaId
    }

    return this.http.patch(
      this.url + "Asignada", politica
    )
  }

  eliminarPolitica(politicaId : number){
    return this.http.delete(this.url + politicaId)
  }

  //consulta todas las politicas creadas
  consultarPoliticas(): Observable<PoliticaConsultar[]>{
    return this.http.get<PoliticaConsultar[]>(this.url)
  }

  //Consulta la politicas que un usuario tiene por anotar 
  consultarPoliticaAnotar(): Observable<PoliticaAnotarConsultar[]> {
    this.usuarioAux = JSON.parse(localStorage.getItem('usuario'))

    return this.http.get<PoliticaAnotarConsultar[]>(this.url + "Anotar/" + this.usuarioAux.id)
  }

  //Consulta las politicas que un usuario tiene por consolidar
  consultarPoliticaConsolidar(): Observable<PoliticaAnotarConsultar[]> {
    this.usuarioAux = JSON.parse(localStorage.getItem('usuario'))

    return this.http.get<PoliticaAnotarConsultar[]>(this.url + "Consolidar/" + this.usuarioAux.id)
  }

  //Consulta los parrafos de la politica a anotar
  consultarParrafosPoliticaAnotar(politica_id: number): Observable<PoliticaVisualizar> {
    return this.http.get<PoliticaVisualizar>(this.url + "Parrafos/" + politica_id)
  }

  asignarPoliticaUsuario(politicaUsuario : any){
    return this.http.post(this.url + "Usuarios" , politicaUsuario)
  }

  actualizarPoliticaUsuario(politicaUsuario: any){
    return this.http.put(this.url  + "Usuarios", politicaUsuario)
  }
}
