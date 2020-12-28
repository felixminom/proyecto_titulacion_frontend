import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeViewConsolidacionService {
  ejecuta = new BehaviorSubject<boolean>(true);

  constructor() { }

  obtenerEjecuta() {
    return this.ejecuta.asObservable();
  }

  colocarEjecuta(ejecuta: boolean) {
    console.log("aqui toy")
    this.ejecuta.next(ejecuta)
  }
}
