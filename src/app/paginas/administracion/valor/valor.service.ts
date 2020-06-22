import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Valor, ValorCompleto, ValorGuardar, ValorEditar } from './valor';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class ValorService {

    constructor(
        private http: HttpClient
    ) { }

    url = environment.url + 'Valor/';

    crearValor(valorAux: ValorGuardar) {
        return this.http.post(this.url, valorAux)
    }

    editarValor(valorAux: ValorEditar) {
        return this.http.patch(this.url, valorAux)
    }

    eliminarValor(valorId: number) {
        return this.http.delete(this.url + valorId)
    }

    obtenerValores(): Observable<Valor[]> {
        return this.http.get<Valor[]>(this.url)
    }

    obtenerValoresAtributo(atributoId: number): Observable<Valor[]> {
        return this.http.get<Valor[]>(this.url + 'Atributo/' + atributoId)
    }

    consultarValorCompleto(valorId: number): Observable<ValorCompleto> {
        return this.http.get<ValorCompleto>(this.url + "Completo/" + valorId)
    }

}