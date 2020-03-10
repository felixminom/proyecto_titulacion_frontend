import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Anotacion, UsuarioAnotacion, AnotacionEditar } from '../anotacion';
import { ValorService } from '../../administracion/valor/valor.service';
import { ValorCompleto } from '../../administracion/valor/valor';
import { AnotacionService } from '../anotacion.service';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

@Component({
  selector: 'app-comentario-anotacion',
  templateUrl: './comentario-anotacion.component.html',
  styleUrls: ['./comentario-anotacion.component.css']
})
export class ComentarioAnotacionComponent {

  anotacionAux: UsuarioAnotacion;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _valorService: ValorService,
    private _anotacionService: AnotacionService,
    private _dialogoInterno: MatDialogRef<ComentarioAnotacionComponent>,
    private _notificacion: MatSnackBar
  ) {
    this.anotacionAux = data.anotacionAux;
  }


  editarAnotacion() {
    let texto_html_aux = this.anotacionAux.texto.replace("  ", "<br><br>");

    let anotacionEditarAux: AnotacionEditar = {
      id : this.anotacionAux.id,
      texto: this.anotacionAux.texto,
      texto_html : texto_html_aux,
      comentario : this.anotacionAux.comentario,
      permite : this.anotacionAux.permite
    }

    console.log(this.anotacionAux.permite)
     this._anotacionService.editarAnotacion(anotacionEditarAux).subscribe(
      () => {
        this.notificacion("Anotacion editada con exito!", "exito-snackbar")
        this._dialogoInterno.close()
      },
      () => this.notificacion("ERROR editando anotacion!", "fracaso-snackbar")
    )
  }

  cambiarPermite(){
    this.anotacionAux.permite = !this.anotacionAux.permite
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
