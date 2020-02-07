import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RespuestaPoliticaVisualizar, PoliticaGuardar } from '../politica'
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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

  constructor(
    private dialogo : MatDialogRef<PrevisualizacionComponent>,
    private fb : FormBuilder,
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
          this.politicaTexto += '<span style="font-weight: bold; font-size: 18px;">' 
          + item.titulo + '</span><br><br>';
        }
          this.politicaTexto += item.texto_html + '<hr>';
      }
    )
  }

  guardarPolitica(){
    this.guardarBoton = true;
    this.cerrarFormulario(this.guardarBoton)
  }

  cancelarPolitica(){
    this.guardarBoton = false;
    this.cerrarFormulario(this.guardarBoton)
  }

  cerrarFormulario(guardar : Boolean){
    this.formulario = this.fb.group({
      guardar: guardar
    })
    this.dialogo.close(this.formulario.value)
  }

  ngOnInit() {
    this.unirPolitica(this.politicaVisualizar)
    let texto = this.documento.getElementById("politicaTexto");
    texto.innerHTML = this.politicaTexto;
  }

}
