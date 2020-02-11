import { Component, OnInit } from '@angular/core';
import { PoliticaAnotarConsultar } from '../administracion/politica/politica';
import { PoliticaService } from '../administracion/politica/politica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consolidacion',
  templateUrl: './consolidacion.component.html',
  styleUrls: ['./consolidacion.component.css']
})
export class ConsolidacionComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'progreso']
  listaPoliticas : PoliticaAnotarConsultar[] =[]
  
  constructor(
    private _politicaService : PoliticaService,
    private _router : Router
  ) { }

  consultarPoliticasConsolidar(){
    this._politicaService.consultarPoliticaConsolidar().subscribe(
      result => {this.listaPoliticas = result}
    )
  }

  
  redirigirPolitica(politicaAux : PoliticaAnotarConsultar){
    this._router.navigate(['/paginas/consolidacion/politica'], {state: {politica_id: politicaAux.politica_id}})
  }

  ngOnInit() {
    this.consultarPoliticasConsolidar();
  }

}
