import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { RespuestaPoliticaVisualizar, PoliticaGuardar } from '../politica'
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PoliticaService } from '../politica.service';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

@Component({
  selector: 'app-previsualizacion',
  templateUrl: './previsualizacion.component.html',
  styleUrls: ['./previsualizacion.component.css']
})
export class PrevisualizacionComponent implements OnInit {

  politicaVisualizar : RespuestaPoliticaVisualizar = null;
  politicaGuardar : PoliticaGuardar = null;
  politicaTexto = '';

  formulario : FormGroup;
  guardarBoton : boolean = null;

  archivoPolitica : File;

  constructor(
    private _dialogo : MatDialogRef<PrevisualizacionComponent>,
    @Inject(MAT_DIALOG_DATA) private data : any,
    @Inject(DOCUMENT) private documento : Document,
    private _politicaService : PoliticaService,
    private _notificacion : MatSnackBar,
    private _fb : FormBuilder
  ) {
    //dialogo.disableClose = true; 
    this.politicaVisualizar = data.politicaVisualizar;
    this.politicaGuardar = data.politicaGuardar;
    this.archivoPolitica = data.archivo
   }
  
  unirPolitica(respuesta : RespuestaPoliticaVisualizar){
    respuesta.politica.parrafos.forEach(
      item => {
        if(item.titulo != ''){
          this.politicaTexto += '<span style="font-weight: bold; font-size: 18px;">' 
          + item.titulo + '</span><br><br>';
        }
          this.politicaTexto += item.texto_html + '<hr>';
      }
    )
  }

  guardarPolitica(){
    this.formulario = this._fb.group({
      guardar: true
    })

    this._politicaService.guardarPolitica(this.politicaGuardar,this.archivoPolitica).subscribe(
      ()=> {
        this.notificacion('Politica creada con exito!','exito-snackbar')
        this._dialogo.close(this.formulario.value)
      },
      error => this.notificacion('La politica no pudo ser creada','fracaso-snackbar')
    )
  }

  cancelarPolitica(){
    this._dialogo.close()
  }

  notificacion(mensaje : string, estilo : string){
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      panelClass: [estilo],
      duration: 3000,
      verticalPosition: 'top'
    })
  }


  ngOnInit() {
    this.unirPolitica(this.politicaVisualizar)
    let texto = this.documento.getElementById("politicaTexto");
    texto.innerHTML = this.politicaTexto;
  }

}
