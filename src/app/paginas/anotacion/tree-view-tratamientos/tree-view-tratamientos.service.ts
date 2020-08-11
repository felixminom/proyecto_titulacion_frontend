import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeViewCheckService {

  permite = new BehaviorSubject<boolean>(true);

  constructor() { }

  obtenerPermite(){
    return this.permite.asObservable();
  }
  
  colocarPermite(permite : boolean){
    this.permite.next(permite)
  }
}
