import { Component, OnInit, Inject } from '@angular/core';
import { UsuarioAnotacion } from '../anotacion';
import { AnotacionService } from '../anotacion.service';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

@Component({
  selector: 'app-visualizar-anotaciones',
  templateUrl: './visualizar-anotaciones.component.html',
  styleUrls: ['./visualizar-anotaciones.component.css']
})
export class VisualizarAnotacionesComponent implements OnInit {

  usuarioId : number;
  parrafoId : number;

  anotaciones : UsuarioAnotacion[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data : any,
    private _anotacionService : AnotacionService,
    private _notificacion : MatSnackBar
  ) { 
    this.usuarioId = this.data.usuarioId
    this.parrafoId = this.data.parrafoId
  }

  consultarAnotaciones(){
    this._anotacionService.obtenerAnotacionesAnotadorParrafo(this.parrafoId, this.usuarioId).subscribe(
      resultado => this.anotaciones = resultado,
      error => this.anotaciones = []
    )
  }

  eliminarAnotacion(anotacionAux : UsuarioAnotacion){
    if(confirm("Esta seguro de eliminar esta anotacion?\nEsta acción no podra ser revertida")){
      this._anotacionService.eliminarAnotacion(anotacionAux.id).subscribe(
        ()=> {
          this.notificacion("Tratamiento eliminado con exito!", "exito-snackbar")
          this.consultarAnotaciones()
        },
        () => this.notificacion("ERROR eliminando tratamiento!", "fracaso-snackbar")
      )
    }
  }

  editarAnotacion(anotacionAux : UsuarioAnotacion){
    console.log("Editando anotacion")
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
    this.consultarAnotaciones()
  }

}
