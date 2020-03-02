import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { PoliticaService} from 'src/app/paginas/administracion/politica/politica.service'
import { PoliticaVisualizar } from '../../administracion/politica/politica';
import { SelectTextBoxService } from './select-text-box.service'
import { AnotacionService} from '../anotacion.service'
import { totalAnotaciones } from '../anotacion';
import { MatDialog } from '@angular/material';
import { VisualizarAnotacionesComponent } from '../visualizar-anotaciones/visualizar-anotaciones.component';
import { BehaviorSubject } from 'rxjs';

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

  totalAnotacionesParrafo = 0;

  usuarioAux = JSON.parse(localStorage.getItem('usuario'))

  parrafoIndice = 0;
  parrafoId = 0;
  totalParrafos = 0;
  parrafoTitulo = '';
  parrafoActual = '';
  textoSelecccionadoHtmlAux = "";
  textoSeleccionadoAux = "";

  constructor(
    @Inject(DOCUMENT) private documento: Document,
    private _politicaService : PoliticaService,
    private _seleccionarTextoService : SelectTextBoxService,
    private _anotacionService : AnotacionService,
    private _dialogo : MatDialog
  ) {
  }

  //abri modal con anotaciones 
  visualizarAnotaciones(){
    const dialogoAnotaciones = this._dialogo.open(VisualizarAnotacionesComponent, {
      width: '700px',
      height: '80%',
      data:{
        parrafoId: this.parrafoId,
        usuarioId: this.usuarioAux.id
      }
    })

    dialogoAnotaciones.afterClosed().subscribe(
      () => this._seleccionarTextoService.consultarTotalAnotacionesAnotadorParrafoServicio(this.parrafoId,this.usuarioAux.id)
    )
  }

  /*consultarTotalAnotacionesAnotadorParrafo(parrafoId: number, usuarioId : number){
    this._anotacionService.obtenerTotalAnotacionesAnotadorParrafo(parrafoId,usuarioId).subscribe(
     (resultado : totalAnotaciones)=> this.totalAnotacionesParrafo = resultado.num_anotaciones,
     error => console.log(error)
    )
  }*/

  consultarParrafosPolitica(politicaIdAux : number){
    this._politicaService.consultarParrafosPoliticaAnotar(politicaIdAux).subscribe(
      resultado => {
        this.politica = resultado;
        this.totalParrafos = this.politica.parrafos.length;
        this.parrafoId = this.politica.parrafos[this.parrafoIndice].id;
        this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
        this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;

        this._seleccionarTextoService.obtenerNumeroAnotacionParrafo().subscribe(
          numero => this.totalAnotacionesParrafo = numero
        )

        let elemento = this.documento.getElementById("texto");
        elemento.innerHTML = this.parrafoActual;
      },
      error => console.log(error)
    )
  }

  seleccion(){
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

    this._seleccionarTextoService.colocarTexto(this.textoSeleccionadoAux)
    this._seleccionarTextoService.colocarTextoHtml(this.textoSelecccionadoHtmlAux)

    if (this.textoSeleccionadoAux != "") {
      let input = this.documento.getElementById("seleccion");
      this._seleccionarTextoService.obtenerTextoHmtl().subscribe(
        resultado => input.innerHTML = resultado
      )
    }
  }

  anteriorParrafo() {
    if (this.parrafoIndice !=0){
      this.parrafoIndice -= 1;
      this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
      this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;
      this.parrafoId = this.politica.parrafos[this.parrafoIndice].id;
      this._seleccionarTextoService.consultarTotalAnotacionesAnotadorParrafoServicio(this.parrafoId,this.usuarioAux.id)
      let elemento = this.documento.getElementById("texto");
      elemento.innerHTML = this.parrafoActual;
      this.limpiarTextoEscogido();
      this.parrafo_cambiado.emit()
    }

  }

  siguienteParrafo(){
    if (this.parrafoIndice != this.totalParrafos-1){
      this.parrafoIndice += 1;
      this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
      this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;
      this.parrafoId = this.politica.parrafos[this.parrafoIndice].id;
      this._seleccionarTextoService.consultarTotalAnotacionesAnotadorParrafoServicio(this.parrafoId,this.usuarioAux.id)
      let elemento = this.documento.getElementById("texto");
      elemento.innerHTML = this.parrafoActual;
      this.limpiarTextoEscogido();
      this.parrafo_cambiado.emit()
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
      this._seleccionarTextoService.colocarTexto(this.textoSeleccionadoAux)
      this.textoSeleccionado.emit();
    }else{
      alert("No existe texto seleccionado");
    }
  }

  textoValidadoHtml(){
    if(this.textoSeleccionadoAux != ""){
      this._seleccionarTextoService.colocarTextoHtml(this.textoSelecccionadoHtmlAux)
      this.textoSeleccionadoHtml.emit();
    }
  }

  emitirParrafoId(){
    this.parrafo_id.emit(this.parrafoId);
  }

  ngOnInit() {
    this.consultarParrafosPolitica(this.politicaId)
  }

}
