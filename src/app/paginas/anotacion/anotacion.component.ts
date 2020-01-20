import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Tratamiento } from '../administracion/tratamiento/tratamiento';
import { TratamientoService } from '../administracion/tratamiento/tratamiento.service';
import { Atributo } from '../administracion/atributo/atributo'
import { AtributoService } from '../administracion/atributo/atributo.service'
import { Valor } from '../administracion/valor/valor';
import { ValorService } from '../administracion/valor/valor.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-anotacion',
  templateUrl: './anotacion.component.html',
  styleUrls: ['./anotacion.component.css']
})
export class AnotacionComponent implements OnInit {

  @ViewChild('dataContainer',{static: false}) dataContainer: ElementRef;

  constructor(
    @Inject(DOCUMENT) private documento:Document,
    private readonly tratamientoService: TratamientoService,
    private readonly atributoService: AtributoService,
    private readonly valorService: ValorService,
  ) { }

  tratamientoControl = new FormControl('', [Validators.required]);
  tratamientos: Tratamiento[];

  atributoControl = new FormControl('', [Validators.required]);
  atributos: Atributo[];

  valorControl = new FormControl('', [Validators.required]);
  valores: Valor[];

  error: any;
  pruebaMensaje = '<p class="tooltip">Hover over me  <span class="tooltiptext">'+this.error+' </span></p>'
  politica = {
    nombre:'Google LLC',
    parrafo :[
      {
        titulo: 'Queremos que comprenda los tipos de información que recopilamos mientras usa nuestros servicios',
        contenido: 'Creamos una amplia variedad de servicios que permiten que millones de personas exploren el mundo e interactúen con él de nuevas maneras todos los días. Nuestros servicios incluyen lo siguiente:<br><br>Apps, sitios y dispositivos de Google, como Búsqueda, YouTube y Google Home<br><br>Plataformas como el navegador de Chrome y el sistema operativo Android<br><br>Productos que están integrados en apps y sitios de terceros, como anuncios y Google Maps incorporado<br><br>'
      }
    ]
      
  }

  parrafoTitulo = this.politica.parrafo[0].titulo;

  parrafoActual = this.politica.parrafo[0].contenido;

  parrafoSaltos = this.politica.parrafo[0].contenido.split('\n')

  colorSeleccionado: any;

  tratamientoSeleccionado : Tratamiento;

  consultarTratamientos() {
    return this.tratamientoService.obtenerTratamientos().subscribe(result => {
      this.tratamientos = result;
    })
  }

  consultarAtributosTratamiento(tratamientoId: number) {
    return this.atributoService.obtenerAtributosTratamiento(tratamientoId).subscribe(
      (resultado: Atributo[]) => this.atributos = resultado),
      error => this.error = error
  }

  consultarValoresAtributo(atributoId: number) {
    return this.valorService.obtenerValoresAtributo(atributoId).subscribe(
      (resultado: Valor[]) => this.valores = resultado),
      error => this.error = error
  }

  seleccionarAtributos(tratamiento: Tratamiento) {
    this.tratamientoSeleccionado = tratamiento;
    this.colorSeleccionado = tratamiento.color_primario;
    this.vaciarTodo();
    this.consultarAtributosTratamiento(tratamiento.id);
  }

  seleccionarValores(atributo: Atributo) {
    this.valores = [];
    this.consultarValoresAtributo(atributo.id);
  }

  vaciarTodo() {
    this.atributos = [];
    this.valores = [];
  }

  vaciarValores() {
    this.valores = [];
  }

  activarParrafo(activado: string): Object {
    return {
      'disabled': activado
    }

  }

  estiloSeleccion(colorAux?: string): Object {
    return {
      'color' :colorAux,
      'font-weight': '500'
    }
  }

  seleccion(){
    let seleccion = this.documento.getSelection();

    let textoselec="";
    seleccion.getRangeAt(0).cloneContents().childNodes.forEach(
      item =>{
        if(item.nodeName == "BR"){
          textoselec+="<br>";
        }
        else{
          textoselec+=item.textContent
        }
        
      }
    )
    console.log(textoselec);

  }

  
  ngOnInit() {
    this.consultarTratamientos();
    let elemento = this.documento.getElementById("texto");
    elemento.innerHTML = this.parrafoActual;
  }


}
