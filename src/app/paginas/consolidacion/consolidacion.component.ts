import { Component, OnInit } from '@angular/core';
import { PoliticaAnotarConsultar } from '../administracion/politica/politica';
import { PoliticaService } from '../administracion/politica/politica.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { VisualizarDetallesComponent } from './visualizar-detalles/visualizar-detalles.component';

@Component({
  selector: 'app-consolidacion',
  templateUrl: './consolidacion.component.html',
  styleUrls: ['./consolidacion.component.css']
})
export class ConsolidacionComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'progreso', 'detalles']
  listaPoliticas : PoliticaAnotarConsultar[] =[]
  
  constructor(
    private _politicaService : PoliticaService,
    private _router : Router,
    private _dialogo : MatDialog
  ) { }

  consultarPoliticasConsolidar(){
    this._politicaService.consultarPoliticaConsolidar().subscribe(
      result => {this.listaPoliticas = result}
    )
  }

  
  redirigirPolitica(politicaAux : PoliticaAnotarConsultar){
    this._router.navigate(['/paginas/consolidacion/politica'], {state: {politica_id: politicaAux.politica_id}})
  }

  detallesPolitica(politica: PoliticaAnotarConsultar){
    let dialogoDetalles = this._dialogo.open(VisualizarDetallesComponent,{
      width: '40%',
      height: '55%',
      data: {
        politicaAux: politica,
      }
    })
  }

  ngOnInit() {
    this.consultarPoliticasConsolidar();
  }

}
