import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { UsuarioGuardar } from '../usuario';
import { DOCUMENT } from '@angular/common';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';
import { UsuarioService } from '../usuario.service';


interface RolUsuario {
  id : number,
  descripcion : string
}


@Component({
  selector: 'app-usuario-dialogo',
  templateUrl: './usuario-dialogo.component.html',
  styleUrls: ['./usuario-dialogo.component.css']
})
export class UsuarioDialogoComponent implements OnInit {

  rolUsuario: RolUsuario;
  rolesUsuario: RolUsuario[] = 
  [
    {
      id : 1,
      descripcion: "Administrador"
    },
    {
      id: 2,
      descripcion: "Anotador"
    }
];

  nuevo: boolean;
  titulo: string;
  formulario: FormGroup;
  id : number;
  checkedAux = true;

  email= new FormControl('', [Validators.required])
  rol_usuario = new FormControl(1, [Validators.required])
  entrenamiento = new FormControl(true,[Validators.required])


  usuarioAux: UsuarioGuardar;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _notificacion : MatSnackBar,
    private _usuarioService : UsuarioService,
    private _dialogoInterno : MatDialogRef<UsuarioDialogoComponent>
  ) {
    console.log(data)
    this.usuarioAux = data.usuario
    this.nuevo = data.nuevo
    this.formulario = this.crearFormulario(this.usuarioAux)

    if (this.nuevo) {
      this.titulo = 'Creacion de usuario'
    } else {
      this.id = this.data.usuario.id
      this.titulo = 'Edicion de usuario'
    }
  }

  crearFormulario(usuarioAux: UsuarioGuardar) {
    return this.fb.group({
      email: [usuarioAux.email,Validators.required],
      rol_usuario_id: [usuarioAux.rol_usuario_id,Validators.required],
      entrenamiento: [usuarioAux.entrenamiento,Validators.required],
      activo: [usuarioAux.activo, Validators.required]
    })
  }

  guardar(){
    if (this.formulario.valid) {
      if (this.nuevo){
        let usuarioNuevo = {
          email : this.formulario.value.email,
          rol_usuario : this.formulario.value.rol_usuario_id,
          entrenamiento : this.formulario.value.entrenamiento
        }
        this.guardarUsuario(usuarioNuevo)
        
      }else{
        let usuarioEditar = {
          id: this.id,
          email : this.formulario.value.email,
          rol_usuario : this.formulario.value.rol_usuario_id,
          entrenamiento: this.formulario.value.entrenamiento,
          activo: this.formulario.value.activo
        }
        this.editarUsuario(usuarioEditar)
      }
    }else{
      alert('El formulario contiene campos vacios por favor revise')
    }

  }

  guardarUsuario(usuarioAux){
    this._usuarioService.crearUsuario(usuarioAux).subscribe(
      () => {
        this.notificacion('Usuario creado con exito!','exito-snackbar')
        this._dialogoInterno.close()
      },
      error => this.notificacion('ERROR creando usuario!','fracaso-snackbar')
    )
   
  }

  editarUsuario(usuarioAux){
    this._usuarioService.editarUsuario(usuarioAux).subscribe(
      () =>{
        this.notificacion('Usuario editado con exito!','exito-snackbar')
        this._dialogoInterno.close()
      } ,
      error =>  this.notificacion('ERROR editando usuario!','fracaso-snackbar')
    )
  }

  notificacion(mensaje : string, estilo : string){
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      panelClass: [estilo],
      duration: 2000,
      verticalPosition: 'top'
    })
  }


  ngOnInit() {

  }

}
