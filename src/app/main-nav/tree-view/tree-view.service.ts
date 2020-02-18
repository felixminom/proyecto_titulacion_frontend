import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TreeViewService {

  constructor(
    private _router : Router
  ) { 
  if (localStorage.getItem('usuario') != null){
    

  }else{
    console.log('Error en el nav')
    this._router.navigate(['/login'])
  }
  }


}
