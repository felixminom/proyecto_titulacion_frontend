import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PoliticaAnotarConsultar} from './anotacion'

@Injectable({
  providedIn: 'root'
})
export class AnotacionService {

  url = environment.url + 'Politica/'

  constructor() { }
}
