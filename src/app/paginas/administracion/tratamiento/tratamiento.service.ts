import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TratamientoConsultar, TratamientoGuardar, TratamientoEditar } from './tratamiento';
import { environment } from 'src/environments/environment';
import { TratamientoNodo } from 'src/app/paginas/anotacion/tree-view-check/tree-view-check.component';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  url = environment.url + 'Tratamiento/';

  constructor(
    private http: HttpClient) { }


  obtenerTratamientos(): Observable<TratamientoConsultar[]> {
    return this.http.get<TratamientoConsultar[]>(this.url);
  }

  obtenerTratamientosCompletos(): Observable<TratamientoNodo[]> {
    return this.http.get<TratamientoNodo[]>(this.url + "TratamientosCompletos")
  }

  crearTratamiento(tratamiento: TratamientoGuardar): Observable<TratamientoConsultar> {
    return this.http.post<TratamientoConsultar>(this.url, tratamiento);
  }

  editarTratamiento(tratamiento: TratamientoEditar){
    return this.http.patch(this.url, tratamiento);
  }

  eliminarTratamiento(tratamientoId : number){
    return this.http.delete(this.url + tratamientoId);

  }
}
