import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PoliticaService } from '../../administracion/politica/politica.service';
import { PoliticaVisualizar } from '../../administracion/politica/politica';

@Component({
  selector: 'app-select-text-consolidacion',
  templateUrl: './select-text-consolidacion.component.html',
  styleUrls: ['./select-text-consolidacion.component.css']
})
export class SelectTextConsolidacionComponent implements OnInit {
  @Output() textoSeleccionadoHtml = new EventEmitter<string>();
  @Output() textoSeleccionado = new EventEmitter<string>();

  politica : PoliticaVisualizar = null;
  parrafoIndice = 0;
  totalParrafos = 0;
  parrafoTitulo = '';
  parrafoActual = '';
  textoSelecccionadoHtmlAux = "";
  textoSeleccionadoAux = "";

  constructor(
    @Inject(DOCUMENT) private documento: Document,
    private _politicaService : PoliticaService
  ) { }

  consultarParrafosPolitica(politica_id : number){
    this._politicaService.consultarParrafosPoliticaAnotar(13).subscribe(
      resultado => {
        this.politica = resultado;
        this.totalParrafos = this.politica.parrafos.length;
        this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
        this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;
        
        let elemento = this.documento.getElementById("texto");
        elemento.innerHTML = this.parrafoActual;
      },
      error => console.log(error)
    )
  }

  seleccion() {
    this.textoSelecccionadoHtmlAux = "";
    this.textoSeleccionadoAux = "";
    let seleccion = this.documento.getSelection();

    //obtenemos el texto puro y en html 
    seleccion.getRangeAt(0).cloneContents().childNodes.forEach(
      item => {
        if (item.nodeName == "BR") {
          this.textoSelecccionadoHtmlAux += "<br>";
          this.textoSeleccionadoAux += " ";
        }
        else {
          this.textoSelecccionadoHtmlAux += item.textContent;
          this.textoSeleccionadoAux += item.textContent;
        }

      }
    )
    console.log(this.textoSelecccionadoHtmlAux)
  }

  anteriorParrafo() {
    if (this.parrafoIndice !=0){
      this.parrafoIndice -= 1;
      this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
      this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;
      let elemento = this.documento.getElementById("texto");
      elemento.innerHTML = this.parrafoActual;
    }
  }

  siguienteParrafo(){
    if (this.parrafoIndice != this.totalParrafos-1){
      this.parrafoIndice += 1;
      this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
      this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;
      let elemento = this.documento.getElementById("texto");
      elemento.innerHTML = this.parrafoActual;
    }else{
      alert("ULTIMO PARRAFO/ GUARDAR POLITICA")
    }
  }

  textoValidado(){
    if(this.textoSeleccionadoAux != ""){
      this.textoSeleccionadoHtml.emit(this.textoSelecccionadoHtmlAux);
      this.textoSeleccionado.emit(this.textoSeleccionadoAux);

    }else{
      alert("No existe texto seleccionado");
    }
    
  }

  
  ngOnInit() {
    this.consultarParrafosPolitica(12)
  }
}