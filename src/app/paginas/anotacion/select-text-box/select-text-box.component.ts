import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { PoliticaService} from 'src/app/paginas/administracion/politica/politica.service'
import { PoliticaVisualizar } from '../../administracion/politica/politica';
import { SelectTextBoxService } from './select-text-box.service'
import { MatDialog, MatSnackBar } from '@angular/material';
import { VisualizarAnotacionesComponent } from '../visualizar-anotaciones/visualizar-anotaciones.component';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-text-box',
  templateUrl: './select-text-box.component.html',
  styleUrls: ['./select-text-box.component.css']
})

export class SelectTextBoxComponent implements OnInit {

  @Input() politicaId  : number;
  @Output() parrafo_id = new EventEmitter<number>();
  @Output() guardar_anotaciones = new EventEmitter<null>();
  @Output() parrafo_cambiado = new EventEmitter<boolean>();

  politica : PoliticaVisualizar = null;
  usuarioAux = JSON.parse(localStorage.getItem('usuario'))

  parrafoIndice = 0;
  parrafoId = 0;
  totalParrafos = 0;
  parrafoTitulo = '';
  parrafoActual = '';
  textoSelecccionadoHtmlAux = "";
  textoSeleccionadoAux = "";

  totalAnotacionesParrafo = 0;

  constructor(
    @Inject(DOCUMENT) private documento: Document,
    private _politicaService : PoliticaService,
    private _seleccionarTextoService : SelectTextBoxService,
    private _dialogo : MatDialog,
    private _notificacion : MatSnackBar,
    private _router : Router
  ) {}

  visualizarAnotaciones(){
    const dialogoAnotaciones = this._dialogo.open(VisualizarAnotacionesComponent, {
      width: '50%',
      height: '80%',
      data:{
        parrafoId: this.parrafoId,
        usuarioId: this.usuarioAux.id,
        consolidacion : false
      }
    })

    dialogoAnotaciones.afterClosed().subscribe(
      () => this._seleccionarTextoService.consultarTotalAnotacionesAnotadorParrafoServicio(this.parrafoId,this.usuarioAux.id)
    )
  }

  consultarParrafosPolitica(politicaIdAux : number){
    this._politicaService.consultarParrafosPoliticaAnotar(politicaIdAux).subscribe(
      resultado => {
        this.politica = resultado;
        this.totalParrafos = this.politica.parrafos.length;
        this.parrafoId = this.politica.parrafos[this.parrafoIndice].id;
        this.parrafoTitulo = this.politica.parrafos[this.parrafoIndice].titulo;
        this.parrafoActual = this.politica.parrafos[this.parrafoIndice].texto_html;
        this._seleccionarTextoService.consultarTotalAnotacionesAnotadorParrafoServicio(this.parrafoId,this.usuarioAux.id).subscribe(
          totalAnotaciones => this.totalAnotacionesParrafo = totalAnotaciones
        )
        let elemento = this.documento.getElementById("texto");
        elemento.innerHTML = this.parrafoActual;
      },
      error => console.log(error)
    )
  }

  politicaUsuarioFinalizada(){
    this._politicaService.editarPoliticaAnotadorFinalizada(this.politicaId,this.usuarioAux.id).subscribe(
      () => {
        this.notificacion("Politica finalizada con exito!", "exito-snackbar")
        this._router.navigate(['/home'])
      },
      () => this.notificacion("ERROR finalizando politica!", "fracaso-snackbar")
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
      if (confirm("Ha terminado de anotar esta política, desea finalizar?\nUna vez finalizada no podra ser modificada" )){
        this.politicaUsuarioFinalizada()
      }
    }
  }

  limpiarTextoEscogido(){
    this.textoSelecccionadoHtmlAux = "";
    this.textoSeleccionadoAux = "";
    let textoSeleccionado = this.documento.getElementById("seleccion");
    textoSeleccionado.click();
    textoSeleccionado.innerHTML = this.textoSelecccionadoHtmlAux;
  }


  emitirGuardarAnotaciones(){
    if(this.textoSeleccionadoAux != ""){
      this._seleccionarTextoService.colocarTexto(this.textoSeleccionadoAux)
      this._seleccionarTextoService.colocarTextoHtml(this.textoSelecccionadoHtmlAux)
      this.guardar_anotaciones.emit();
    }else{
      alert("No existe texto seleccionado");
    }
  }

  emitirParrafoId(){
    this.parrafo_id.emit(this.parrafoId);
  }

  notificacion(mensaje : string, estilo : string){
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      panelClass: [estilo],
      duration: 2000,
      verticalPosition: 'top'
    })
  }

  ngOnInit() {
    this.consultarParrafosPolitica(this.politicaId)
  }

}
