import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atributo, AtributoGuardar, AtributoEditar } from './atributo';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class AtributoService {

    constructor(private http: HttpClient) { }

    url = environment.url + 'Atributo/';

    crearAtributo(atributo : AtributoGuardar){
        return this.http.post(this.url, atributo);
    }

    editarAtributo(atributoAux : AtributoEditar){
        return this.http.patch(this.url, atributoAux);
    }

    eliminarAtributo(atributoId :number){
        return this.http.delete(this.url + atributoId)
    }

    obtenerTodosAtributos(): Observable<Atributo[]> {
        return this.http.get<Atributo[]>(this.url)
    }

    obtenerAtributosTratamiento(tratamientoId: number): Observable<Atributo[]> {
        return this.http.get<Atributo[]>(this.url + 'Tratamiento/' + tratamientoId)
    }
}
