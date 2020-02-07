import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import {TodoItemNode} from 'src/app/paginas/anotacion/tree-view-check/tree-view-check.component';
import {PoliticaGuardar, RespuestaPoliticaVisualizar} from './politica'


@Injectable({
  providedIn: 'root'
})
export class PoliticaService {

  url = environment.url + 'Politica/';

  constructor(private http: HttpClient) {}

  previsualizacionPolitica(politicaAux : PoliticaGuardar, archivo :File){
    const formData : FormData = new FormData();
    formData.append('politica',archivo);
    formData.append('nombre', politicaAux.nombre);
    formData.append('url', politicaAux.url )
    formData.append('fecha', politicaAux.fecha)
    return this.http.post<RespuestaPoliticaVisualizar>(this.url +"Previsualizacion", formData)
  }
}
