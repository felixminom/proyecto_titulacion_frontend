import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { PoliticaService} from 'src/app/paginas/administracion/politica/politica.service'
import { PoliticaVisualizar } from '../../administracion/politica/politica';

@Component({
  selector: 'app-select-text-box',
  templateUrl: './select-text-box.component.html',
  styleUrls: ['./select-text-box.component.css']
})

export class SelectTextBoxComponent implements OnInit {

  @Input() politicaId  : number;
  @Output() parrafo_id = new EventEmitter<number>();
  @Output() textoSeleccionadoHtml = new EventEmitter<string>();
  @Output() textoSeleccionado = new EventEmitter<string>();
  @Output() parrafo_cambiado = new EventEmitter<boolean>();

  politica : PoliticaVisualizar = null;

  parrafoIndice = 0;
  parrafoId = 0;
  totalParrafos = 0;
  parrafoTitulo = '';
  parrafoActual = '';
  textoSelecccionadoHtmlAux = "";
  textoSeleccionadoAux = "";

  //ayudara a saber que el parrafo se cambio para limpiar las selecciones
  //en realidad no importa el valor solo el evento.
  parrafoCambiado = true;

  constructor(
    @Inject(DOCUMENT) private documento: Document,
    private _politicaService : PoliticaService
  ) { 
  }

  consultarParrafosPolitica(politicaIdAux : number){
    this._politicaService.consultarParrafosPoliticaAnotar(politicaIdAux).subscribe(
      resultado => {
        this.politica = resultado;
        this.totalParrafos = this.politica.parrafos.length;
        this.parrafoId = this.politica.parrafos[this.parrafoIndice].id;
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
    if (this.textoSeleccionadoAux != "") {
      let input = this.documento.getElementById("seleccion");
      input.innerHTML = this.textoSelecccionadoHtmlAux;
    }
  }

  anteriorParrafo() {
    if (this.parrafoIndice !=0){
      this.parrafoIndice -= 1;
      this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
      this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;
      this.parrafoId = this.politica.parrafos[this.parrafoIndice].id;
      let elemento = this.documento.getElementById("texto");
      elemento.innerHTML = this.parrafoActual;
      this.limpiarTextoEscogido();
      this.parrafo_cambiado.emit(this.parrafoCambiado)
    }

  }

  siguienteParrafo(){
    if (this.parrafoIndice != this.totalParrafos-1){
      this.parrafoIndice += 1;
      this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
      this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;
      this.parrafoId = this.politica.parrafos[this.parrafoIndice].id;
      let elemento = this.documento.getElementById("texto");
      elemento.innerHTML = this.parrafoActual;
      this.limpiarTextoEscogido();
      this.parrafo_cambiado.emit(this.parrafoCambiado)
    }else{
    }

  }

  limpiarTextoEscogido(){
    this.textoSelecccionadoHtmlAux = "";
    this.textoSeleccionadoAux = "";
    let input = this.documento.getElementById("seleccion");
    input.click();
    input.innerHTML = this.textoSelecccionadoHtmlAux;
  }

  textoValidado(){
    if(this.textoSeleccionadoAux != ""){
      this.textoSeleccionado.emit(this.textoSeleccionadoAux);

    }else{
      alert("No existe texto seleccionado");
    }
  }

  textoValidadoHtml(){
    if(this.textoSeleccionadoAux != ""){
      this.textoSeleccionadoHtml.emit(this.textoSelecccionadoHtmlAux);

    }else{
      alert("No existe texto seleccionado");
    }
  }

  emitirParrafoId(){
    this.parrafo_id.emit(this.parrafoId);
  }

  ngOnInit() {
    this.consultarParrafosPolitica(this.politicaId)
  }

}
