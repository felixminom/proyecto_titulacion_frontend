import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeViewCheckService {

  ejecuta = new BehaviorSubject<boolean>(true);

  constructor() { }

  obtenerEjecuta(){
    return this.ejecuta.asObservable();
  }
  
  colocarEjecuta(ejecuta : boolean){
    this.ejecuta.next(ejecuta)
  }
}
