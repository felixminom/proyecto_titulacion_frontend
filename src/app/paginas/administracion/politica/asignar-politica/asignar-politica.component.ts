import { Component, OnInit, Inject } from '@angular/core';
import { UsuarioAsignar } from '../../usuario/usuario';
import { SelectionModel } from '@angular/cdk/collections';
import { UsuarioService } from '../../usuario/usuario.service';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { PoliticaConsultar } from '../politica';
import { PoliticaService } from '../politica.service';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';
import { error } from 'protractor';

@Component({
  selector: 'app-asignar-politica',
  templateUrl: './asignar-politica.component.html',
  styleUrls: ['./asignar-politica.component.css']
})
export class AsignarPoliticaComponent implements OnInit {

  titulo = "Asignacion de usuarios a politica"
  anotadores : UsuarioAsignar[] = [];
  administradores : UsuarioAsignar[] = [];

  politicaAux : PoliticaConsultar;

  administradorEscogido : UsuarioAsignar;

  constructor(
    private _usuarioService : UsuarioService,
    private _politicaService : PoliticaService,
    private _notificacion : MatSnackBar,
    private _dialogoInterno : MatDialogRef<AsignarPoliticaComponent>,
    @Inject(MAT_DIALOG_DATA) private data : any
  ) {
    this.consultarAnotadores()
    this.consultarAdministradores()
    this.politicaAux = data.politica
   }

  anotadoresSeleccionados = new SelectionModel<UsuarioAsignar>(true /* multiple */);

  seleccionarUsuario(usuarioAux: UsuarioAsignar): void {
    this.anotadoresSeleccionados.toggle(usuarioAux);
    this.anotadoresSeleccionados.isSelected(usuarioAux)
  }

  consultarAnotadores(){
    this._usuarioService.obtenerAnotadoresActivos().subscribe(
      resultado => this.anotadores = resultado,
      error => console.log(error)
    )
  }

  consultarAdministradores(){
    this._usuarioService.obtenerAdministradoresActivos().subscribe(
      resultado => this.administradores = resultado,
      error => console.log(error)
    )
  }

  asignarPoliticaAnotador(politicaId : number, usuarioAux : UsuarioAsignar){
    let politicaUsuario ={
      politica_id : politicaId,
      usuario_id : usuarioAux.id,
      consolidar: false
    }

    this._politicaService.asignarPoliticaUsuario(politicaUsuario).subscribe(
      () => this.notificacion('Anotador ' + usuarioAux.email +' asignado con exito!','exito-snackbar'),
      error => this.notificacion('ERROR asignando' + usuarioAux.email +'a la politica!','fracaso-snackbar')
    )
  }

  asignarPoliticaAdministrador(politicaId : number, usuarioAux : UsuarioAsignar){
    let politicaUsuario ={
      politica_id : politicaId,
      usuario_id : usuarioAux.id,
      consolidar: true
    }

    this._politicaService.asignarPoliticaUsuario(politicaUsuario).subscribe(
      () => {
        this.notificacion('Administrador ' + usuarioAux.email +' asignado con exito!','exito-snackbar')
        this._dialogoInterno.close()
      },
      error => this.notificacion('ERROR asignando ' + usuarioAux.email + ' a la politica!','fracaso-snackbar')
    )
  }

  editarPoliticaAsignada(politicaId : number){
    this._politicaService.editarPoliticaAsignada(politicaId).subscribe(
      () => this.notificacion('Politica asignada con exito!','exito-snackbar'),
      error => this.notificacion('Error politica asignada','fracaso-snackbar')
    )
  }

  guardar(){
    if (this.anotadoresSeleccionados.selected.length >= 2){
      if(this.administradorEscogido != null){

          if (confirm("Esta seguro de realizar el cambio?\nRecuerde que esto no podra ser editado en un futuro")) {
            this.anotadoresSeleccionados.selected.forEach(
              anotador => {
                this.asignarPoliticaAnotador(this.politicaAux.id, anotador)
              }
            )
    
            this.asignarPoliticaAdministrador(this.politicaAux.id, this.administradorEscogido)
    
            this.editarPoliticaAsignada(this.politicaAux.id)
            
          } 

        
      }else{
        alert('Seleccione un administrador para consolidar')
      }
    }else{
      alert('Seleccione al menos dos anotadores')
    }
   
  }

  notificacion(mensaje : string, estilo : string){
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      verticalPosition: 'top',
      panelClass: [estilo],
      duration: 2000})
  }
  ngOnInit() {
  }

}
