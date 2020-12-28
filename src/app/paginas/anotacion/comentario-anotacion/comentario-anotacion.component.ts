import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { UsuarioAnotacion, AnotacionEditar } from '../anotacion';
import { AnotacionService } from '../anotacion.service';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

@Component({
  selector: 'app-comentario-anotacion',
  templateUrl: './comentario-anotacion.component.html',
  styleUrls: ['./comentario-anotacion.component.css']
})
export class ComentarioAnotacionComponent {

  anotacion: UsuarioAnotacion;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _anotacionService: AnotacionService,
    private _dialogoInterno: MatDialogRef<ComentarioAnotacionComponent>,
    private _notificacion: MatSnackBar
  ) {
    this.anotacion = data.anotacionAux;
  }


  editarAnotacion() {
    let texto_html_aux = this.anotacion.texto.replace("  ", "<br><br>");

    let anotacionEditarAux: AnotacionEditar = {
      id: this.anotacion.id,
      texto: this.anotacion.texto,
      texto_html: texto_html_aux,
      comentario: this.anotacion.comentario,
      ejecuta: this.anotacion.ejecuta
    }

    this._anotacionService.editarAnotacion(anotacionEditarAux).subscribe(
      () => {
        this.notificacion("Anotacion editada con exito!", "exito-snackbar")
        this._dialogoInterno.close()
      },
      () => this.notificacion("ERROR editando anotacion!", "fracaso-snackbar")
    )
  }

  cambiarejecuta() {
    this.anotacion.ejecuta = !this.anotacion.ejecuta
  }

  notificacion(mensaje: string, estilo: string) {
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      panelClass: [estilo],
      duration: 2000,
      verticalPosition: 'top'
    })
  }


}
