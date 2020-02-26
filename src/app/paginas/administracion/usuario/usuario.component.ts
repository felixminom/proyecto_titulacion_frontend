import { Component, OnInit } from '@angular/core';
import {UsuarioConsultar, UsuarioGuardar} from './usuario'
import {UsuarioService} from './usuario.service'
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { UsuarioDialogoComponent } from './usuario-dialogo/usuario-dialogo.component';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns = ['id','email','rol_usuario','activo','entrenamiento','editar','eliminar'];
  usuarios: UsuarioConsultar[];
  usuarioNuevoAux : UsuarioConsultar ={
    id: 0,
    email: '',
    rol_usuario_id: 2,
    rol_usuario :'',
    entrenamiento: true,
    activo: true
    
  }

  constructor(
    private _usuarioService: UsuarioService,
    private _dialogo : MatDialog,
    private _notificacion : MatSnackBar,

  ) { }

  //OPERACIONES INTERNAS
  nuevoUsuario(){
    const dialogoNuevo = this._dialogo.open(UsuarioDialogoComponent, {
      width: '40%',
      height: '65%',
      data: {
        usuario: this.usuarioNuevoAux,
        nuevo: true
      }
    })

    dialogoNuevo.afterClosed().subscribe(
      ()=>this.consultarUsuarios()
    )
  }

  editarUsuario(usuarioEditar : UsuarioConsultar){
    const dialogoEditar = this._dialogo.open(UsuarioDialogoComponent, {
      width: '40%',
      height: '70%',
      data: {
        usuario: usuarioEditar,
        nuevo: false
      }
    })

    dialogoEditar.afterClosed().subscribe(
      ()=>this.consultarUsuarios()
    )
  }

  eliminarUsuario(usuarioId: number){
    this._usuarioService.eliminarUsuario(usuarioId).subscribe(
      () => {
        this.notificacion('Usuario eliminado con exito!','exito-snackbar')
        this.consultarUsuarios()},
      error =>  this.notificacion('ERROR al eliminar usuario!','fracaso-snackbar')
    )
  }


  //OPERACION DE BASE DE DATOS
  consultarUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      result => {
        this.usuarios = result;}
    )
  }

  //Notificacion

  notificacion(mensaje : string, estilo : string, action?:string){
    let configSuccess: MatSnackBarConfig = {
      panelClass: [estilo],
      duration: 5000,
    };

    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      ...configSuccess
      })
  }



  ngOnInit() {
    this.consultarUsuarios();
  }

}
