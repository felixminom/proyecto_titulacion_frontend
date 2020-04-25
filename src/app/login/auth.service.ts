import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private readonly loginService: LoginService,
    private readonly _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      const estaLogueado = this.loginService.estaLogeado();
      if(estaLogueado){
        return true;
      }else{
        this._router.navigate(['/login']);
        return false;
      }
  }
}
