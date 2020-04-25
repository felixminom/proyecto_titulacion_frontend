import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { UsuarioLogin } from '../login/login';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  modulosAux : any = [];
  usuarioAux : UsuarioLogin = null;
  logueado = false;
  login$ : Observable<boolean>;
  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private _breakpointObserver: BreakpointObserver,
    public _loginService:LoginService,
    private _router :Router,
    ) {
    this.login$= new BehaviorSubject<boolean>(false);
    if(this._loginService.estaLogeado()){
      this.logueado = true;
      this.login$= new BehaviorSubject<boolean>(true);
      this.usuarioAux = JSON.parse(localStorage.getItem('usuario'))
      this.modulosAux = this.usuarioAux.modulos;

    }else{
      this._router.navigate(['/login'])
    }
  }

  logout(){
   this._loginService.logout().subscribe(
     () => {
       localStorage.removeItem('token')
       localStorage.removeItem('usuario')
       this.login$= new BehaviorSubject<boolean>(false);
       this._router.navigate(['/login'])
     },
     () => {
      alert('Existe un error al salir de la herramienta')
     }
   )
  }
}

