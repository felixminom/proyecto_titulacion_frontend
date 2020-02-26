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

  //consulta todas las politicas creadas
  consultarPoliticas(): Observable<PoliticaConsultar[]>{
    return this.http.get<PoliticaConsultar[]>(this.url)
    .pipe(catchError(this.manejarError))
  }

  //Consulta la politicas que un usuario tiene por anotar 
  consultarPoliticaAnotar(): Observable<PoliticaAnotarConsultar[]> {
    this.usuarioAux = JSON.parse(localStorage.getItem('usuario'))

    return this.http.get<PoliticaAnotarConsultar[]>(
      this.url + "Anotar/" + this.usuarioAux.id
    ).pipe(catchError(this.manejarError))
  }

  //Consulta las politicas que un usatio tiene por consolidar
  consultarPoliticaConsolidar(): Observable<PoliticaAnotarConsultar[]> {
    this.usuarioAux = JSON.parse(localStorage.getItem('usuario'))

    return this.http.get<PoliticaAnotarConsultar[]>(
      this.url + "Consolidar/" + this.usuarioAux.id
    ).pipe(catchError(this.manejarError))
  }

  //Consulta los parrafos de la politica a anotar
  consultarParrafosPoliticaAnotar(politica_id: number): Observable<PoliticaVisualizar> {
    return this.http.get<PoliticaVisualizar>(
      this.url + "Parrafos/" + politica_id
    ).pipe(catchError(this.manejarError))
  }

  asignarPoliticaUsuario(politicaUsuario : any){
    return this.http.post(
      this.url + "Usuarios" , politicaUsuario
    ).pipe(catchError(this.manejarError))
  }

  actualizarPoliticaUsuario(politicaUsuario: any){
    return this.http.put(
      this.url  + "Usuarios", politicaUsuario
    ).pipe(catchError(this.manejarError))
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
