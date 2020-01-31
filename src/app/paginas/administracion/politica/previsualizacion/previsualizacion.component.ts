import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RespuestaPoliticaVisualizar, PoliticaGuardar } from '../politica'
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-previsualizacion',
  templateUrl: './previsualizacion.component.html',
  styleUrls: ['./previsualizacion.component.css']
})
export class PrevisualizacionComponent implements OnInit {

  politicaVisualizar : RespuestaPoliticaVisualizar = null;
  politicaGuardar : PoliticaGuardar = null;
  politicaTexto = '';

  constructor(
    private dialogo : MatDialogRef<PrevisualizacionComponent>,
    @Inject(MAT_DIALOG_DATA) private data : any,
    @Inject(DOCUMENT) private documento : Document
  ) {
    //dialogo.disableClose = true; 
    this.politicaVisualizar = data.politicaVisualizar;
    this.politicaGuardar = data.politicaGuardar;
   }
  
  unirPolitica(respuesta : RespuestaPoliticaVisualizar){
    respuesta.politica.parrafos.forEach(
      item => {
        if(item.titulo != ''){
          this.politicaTexto += '<br><br><span style="font-weight: bold; font-size: 18px;">' + item.titulo + '</span><br><br>';
        }
          this.politicaTexto += item.texto_html;
      }
    )
  }


  ngOnInit() {
    this.unirPolitica(this.politicaVisualizar)
    let texto = this.documento.getElementById("politicaTexto");
    texto.innerHTML = this.politicaTexto;

  }

}
