import { Component, OnInit } from '@angular/core';
import { LoginService} from './login.service'
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  errorIngreso : boolean;

  constructor(
    private loginService : LoginService,
    private _route : Router,
    private _fb : FormBuilder
  ) { 
  }

  resetFormulario(){
    this.formulario.reset()
  }

  login(){
    let usuario = this.formulario.get('usuario').value;
    let clave = this.formulario.get('contrasena').value;

    this.loginService.login(usuario, clave).subscribe(
      usuario_auth=>{
        if (usuario_auth.estado){
          localStorage.setItem("token",usuario_auth.Authorization);
          localStorage.setItem("usuario",JSON.stringify(usuario_auth.usuario));
          this._route.navigate(['/home'])
          
        }
      },
      error => {
        this.errorIngreso = true;
        this.formulario.reset();
      }
    )
  }

  ngOnInit() {
    this.formulario = this._fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    })
  }

}
