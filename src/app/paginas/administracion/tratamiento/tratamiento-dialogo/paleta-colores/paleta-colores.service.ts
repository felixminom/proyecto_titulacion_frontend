import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Color} from './color';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })

export class ColorService{
    url = environment.url +'Color/disponible'
    constructor(private http: HttpClient) {}


    ObtenerColoresDisponibles(): Observable<Color[]>{
        return this.http.get<Color[]>(this.url);
      }
}