import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario'
import {UsuarioService} from './usuario.service'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns = ['id','email','rol_usuario','activo','entrenamiento','editar'];
  usuarios:Usuario[];
  /*[
    {
      id: 1,
      email: "prueba1@gmail.com",
      rol_usuario: 1,
      activo: true,
      entrenamiento: false
    },
    {
      id: 1,
      email: "prueba1@gmail.com",
      rol_usuario: 1,
      activo: true,
      entrenamiento: false
    },
    {
      id: 1,
      email: "prueba1@gmail.com",
      rol_usuario: 1,
      activo: false,
      entrenamiento: false
    },
    {
      id: 1,
      email: "prueba1@gmail.com",
      rol_usuario: 1,
      activo: true,
      entrenamiento: true
    }
  ]*/

  constructor(
    private readonly usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.consultarUsuarios();
  }

  consultarUsuarios(){
    this.usuarioService.obtenerUsuarios().subscribe(
      result => {
        this.usuarios = result;}
    )
  }

}
