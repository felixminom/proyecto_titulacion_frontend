import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PoliticaService } from '../../administracion/politica/politica.service';
import { PoliticaVisualizar } from '../../administracion/politica/politica';
import { UsuarioAnotacionService } from '../usuario-anotacion/usuario-anotacion.service';
import { SelectTextConsolidacionService } from './select-text-consolidacion.service';
import { MatDialog } from '@angular/material';
import { VisualizarAnotacionesComponent } from '../../anotacion/visualizar-anotaciones/visualizar-anotaciones.component';

@Component({
  selector: 'app-select-text-consolidacion',
  templateUrl: './select-text-consolidacion.component.html',
  styleUrls: ['./select-text-consolidacion.component.css']
})
export class SelectTextConsolidacionComponent implements OnInit {

  @Input() politicaId  : number;
  @Output() guardar_anotacion = new EventEmitter<null>();
  @Output() parrafo_cambiado = new EventEmitter<boolean>();

  politica : PoliticaVisualizar = null;
  parrafoId : number = 0;
  parrafoIndice : number = 0;
  totalParrafos : number = 0;
  parrafoTitulo : string = "";
  parrafoActual : string = "";
  totalAnotacionesParrafo : number = 0;
  textoSelecccionadoHtmlAux : string = "";
  textoSeleccionadoAux : string = "";

  usuario = JSON.parse(localStorage.getItem("usuario"));

  constructor(
    @Inject(DOCUMENT) private documento: Document,
    private _politicaService : PoliticaService,
    private _usuarioAnotacionService : UsuarioAnotacionService,
    private _seleccionarTextoConsolidacionService : SelectTextConsolidacionService,
    private _dialogo : MatDialog
    ) {}

  visualizarAnotaciones(){
    const dialogoAnotaciones = this._dialogo.open(VisualizarAnotacionesComponent,{
      width: '50%',
      height: '80%',
      data:{
        parrafoId: this.parrafoId,
        usuarioId: this.usuario.id,
        consolidacion : true
      }
    })

    dialogoAnotaciones.afterClosed().subscribe(
      () => this.consultarTotalAnotacionesParrafo()
    )
  }

  consultarParrafosPolitica(){
    this._politicaService.consultarParrafosPoliticaAnotar(this.politicaId).subscribe(
      resultado => {
        this.politica = resultado;
        this.totalParrafos = this.politica.parrafos.length;
        this.parrafoId = this.politica.parrafos[this.parrafoIndice].id;
        this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
        this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;
        this._seleccionarTextoConsolidacionService.colocarParrafoId(this.parrafoId);
        this.consultarTotalAnotacionesParrafo()
        this.consultarAnotacionesAnotadoresParrafo()
        let elemento = this.documento.getElementById("texto");
        elemento.innerHTML = this.parrafoActual;
      },
      error => console.log(error)
    )
  }

  consultarAnotacionesAnotadoresParrafo(){
    this._usuarioAnotacionService.consultarAnotacionesParrafo(this.politicaId, this.parrafoIndice)
  }

  consultarTotalAnotacionesParrafo(){
    this._seleccionarTextoConsolidacionService.consultarTotalAnotacionesConsolidadorParrafo(this.parrafoId, this.usuario.id).subscribe(
      totalAnotaciones => this.totalAnotacionesParrafo = totalAnotaciones
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
  }

  anteriorParrafo() {
    if (this.parrafoIndice !=0){
      this.parrafoIndice -= 1;
      this.parrafoId = this.politica.parrafos[this.parrafoIndice].id;
      this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
      this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;
      this._seleccionarTextoConsolidacionService.colocarParrafoId(this.politica.parrafos[this.parrafoIndice].id);
      this.consultarAnotacionesAnotadoresParrafo()
      this.consultarTotalAnotacionesParrafo();
      let elemento = this.documento.getElementById("texto");
      elemento.innerHTML = this.parrafoActual;
    }
  }

  siguienteParrafo(){
    if (this.parrafoIndice != this.totalParrafos-1){
      this.parrafoIndice += 1;
      this.parrafoId = this.politica.parrafos[this.parrafoIndice].id;
      this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
      this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;
      this._seleccionarTextoConsolidacionService.colocarParrafoId(this.politica.parrafos[this.parrafoIndice].id);
      this.consultarAnotacionesAnotadoresParrafo();
      this.consultarTotalAnotacionesParrafo()
      let elemento = this.documento.getElementById("texto");
      elemento.innerHTML = this.parrafoActual;
    }else{
      alert("ULTIMO PARRAFO/ GUARDAR POLITICA")
    }
  }

  guardarAnotacion(){
    if(this.textoSeleccionadoAux != ""){
      this._seleccionarTextoConsolidacionService.colocarTextoHtml(this.textoSelecccionadoHtmlAux);
      this._seleccionarTextoConsolidacionService.colocarTexto(this.textoSeleccionadoAux);
      this.guardar_anotacion.emit()
      this.limpiarTextoEscogido()
    }else{
      alert("No existe texto seleccionado");
    }
    
  }

  limpiarTextoEscogido(){
    this.textoSelecccionadoHtmlAux = "";
    this.textoSeleccionadoAux = "";
  }
  
  ngOnInit() {
    this.consultarParrafosPolitica()
  }
}
