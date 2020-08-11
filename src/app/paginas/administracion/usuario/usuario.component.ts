import { Component } from '@angular/core';
import { UsuarioConsultar } from './usuario'
import { UsuarioService } from './usuario.service'
import { MatDialog, MatSnackBar, MatSnackBarConfig, MatTableDataSource } from '@angular/material';
import { UsuarioDialogoComponent } from './usuario-dialogo/usuario-dialogo.component';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  dataSource: MatTableDataSource<UsuarioConsultar>;
  displayedColumns = ['id', 'email', 'rol_usuario', 'activo', 'entrenamiento', 'editar', 'eliminar'];
  usuarioNuevoAux: UsuarioConsultar = {
    id: 0,
    email: '',
    rol_usuario_id: 2,
    rol_usuario: '',
    entrenamiento: true,
    activo: true
  }

  constructor(
    private _usuarioService: UsuarioService,
    private _dialogo : MatDialog,
    private _notificacion : MatSnackBar,

  ) { this.consultarUsuarios()}

  nuevoUsuario() {
    const dialogoNuevo = this._dialogo.open(UsuarioDialogoComponent, {
      width: '40%',
      height: 'fit-content',
      data: {
        usuario: this.usuarioNuevoAux,
        nuevo: true
      }
    })

    dialogoNuevo.afterClosed().subscribe(
      () => this.consultarUsuarios()
    )
  }

  editarUsuario(usuarioEditar: UsuarioConsultar) {
    const dialogoEditar = this._dialogo.open(UsuarioDialogoComponent, {
      width: '40%',
      height: 'fit-content',
      data: {
        usuario: usuarioEditar,
        nuevo: false
      }
    })

    dialogoEditar.afterClosed().subscribe(
      () => this.consultarUsuarios()
    )
  }

  eliminarUsuario(usuarioId: number) {
    if (confirm("Esta seguro de eliminar este usuario?" +
      "\nRecuerde que esta accion no podrá revertirse")) {
      this._usuarioService.eliminarUsuario(usuarioId).subscribe(
        () => {
          this.notificacion('Usuario eliminado con exito!', 'exito-snackbar')
          this.consultarUsuarios()
        },
        () => this.notificacion('ERROR al eliminar usuario!', 'fracaso-snackbar')
      )
    }

  }

  consultarUsuarios() {
    this._usuarioService.obtenerUsuarios().subscribe(
      resultado => this.dataSource = new MatTableDataSource(resultado),
      error => {
        this.notificacion("No ha sido posible obtener los usuarios", "fracaso-snackbar", 4000);
      }
    )
  }

  aplicarFiltro(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase()
  }

  notificacion(mensaje: string, estilo: string, duracion?: number) {
    let configSuccess: MatSnackBarConfig = {
      panelClass: [estilo],
      duration: duracion | 2000,
      verticalPosition: 'top'
    };

    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      ...configSuccess
    })
  }

}
