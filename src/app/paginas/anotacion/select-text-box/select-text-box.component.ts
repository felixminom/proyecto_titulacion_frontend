import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-select-text-box',
  templateUrl: './select-text-box.component.html',
  styleUrls: ['./select-text-box.component.css']
})

export class SelectTextBoxComponent implements OnInit {

  @Output() textoSeleccionadoHtml = new EventEmitter<string>();
  @Output() textoSeleccionado = new EventEmitter<string>();

  politica = {
    nombre: 'Google LLC',
    parrafos: [
      {
        titulo: '1Queremos que comprenda los tipos de información que recopilamos mientras usa nuestros servicios',
        contenido: '1Creamos una amplia variedad de servicios que permiten que millones de personas exploren el mundo e interactúen con él de nuevas maneras todos los días. Nuestros servicios incluyen lo siguiente:<br><br>Apps, sitios y dispositivos de Google, como Búsqueda, YouTube y Google Home<br><br>Plataformas como el navegador de Chrome y el sistema operativo Android<br><br>Productos que están integrados en apps y sitios de terceros, como anuncios y Google Maps incorporado\
        <br><br>1Creamos una amplia variedad de servicios que permiten que millones de personas exploren el mundo e interactúen con él de nuevas maneras todos los días. Nuestros servicios incluyen lo siguiente:<br><br>Apps, sitios y dispositivos de Google, como Búsqueda, YouTube y Google Home<br><br>Plataformas como el navegador de Chrome y el sistema operativo Android<br><br>Productos que están integrados en apps y sitios de terceros, como anuncios y Google Maps incorporado'
      },
      {
        titulo: '2Queremos que comprenda los tipos de información que recopilamos mientras usa nuestros servicios\
        1Queremos que comprenda los tipos de información que recopilamos mientras usa nuestros servicios\
        1Queremos que comprenda los tipos de información que recopilamos mientras usa nuestros servicios',
        contenido: '2Creamos una amplia variedad de servicios que permiten que millones de personas exploren el mundo e interactúen con él de nuevas maneras todos los días. Nuestros servicios incluyen lo siguiente:<br><br>Apps, sitios y dispositivos de Google, como Búsqueda, YouTube y Google Home<br><br>Plataformas como el navegador de Chrome y el sistema operativo Android<br><br>Productos que están integrados en apps y sitios de terceros, como anuncios y Google Maps incorporado<br><br>'
      },
      {
        titulo: '',
        contenido: '3Creamos una amplia variedad de servicios que permiten que millones de personas exploren el mundo e interactúen con él de nuevas maneras todos los días. Nuestros servicios incluyen lo siguiente:<br><br>Apps, sitios y dispositivos de Google, como Búsqueda, YouTube y Google Home<br><br>Plataformas como el navegador de Chrome y el sistema operativo Android<br><br>Productos que están integrados en apps y sitios de terceros, como anuncios y Google Maps incorporado<br><br>'
      }
    ]

  }

  parrafoIndice = 0;

  totalParrafos = this.politica.parrafos.length;

  parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;

  parrafoActual = this.politica.parrafos[this.parrafoIndice].contenido;

  textoSelecccionadoHtmlAux = "";
  textoSeleccionadoAux = "";


  constructor(
    @Inject(DOCUMENT) private documento: Document,
  ) { }


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
    this.parrafoIndice -= 1;
    this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
    this.parrafoActual = this.politica.parrafos[this.parrafoIndice].contenido;
    let elemento = this.documento.getElementById("texto");
    elemento.innerHTML = this.parrafoActual;
    this.limpiarTextoEscogido();
    return this.parrafoIndice
  }

  siguienteParrafo(){
    this.parrafoIndice += 1;
    this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
    this.parrafoActual = this.politica.parrafos[this.parrafoIndice].contenido;
    let elemento = this.documento.getElementById("texto");
    elemento.innerHTML = this.parrafoActual;
    this.limpiarTextoEscogido();
    return this.parrafoIndice
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
      this.textoSeleccionadoHtml.emit(this.textoSelecccionadoHtmlAux);
      this.textoSeleccionado.emit(this.textoSeleccionadoAux);

    }else{
      alert("No existe texto seleccionado");
    }
    
  }

  
  ngOnInit() {
    let elemento = this.documento.getElementById("texto");
    elemento.innerHTML = this.parrafoActual;
  }

}
