import { Component, OnInit, Inject } from '@angular/core';
import { PoliticaService } from '../administracion/politica/politica.service'
import { PoliticaAnotarConsultar } from '../administracion/politica/politica'
import { Router } from '@angular/router';


@Component({
  selector: 'app-anotacion',
  templateUrl: './anotacion.component.html',
  styleUrls: ['./anotacion.component.css']
})
export class AnotacionComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'progreso']
  listaPoliticas: PoliticaAnotarConsultar[] = []


  constructor(
    private _politicaService: PoliticaService,
    private _router: Router
  ) { }

  consultarPoliticasAnotar() {
    this._politicaService.consultarPoliticaAnotar().subscribe(
      result => { this.listaPoliticas = result }
    )
  }

  redirigirPolitica(politicaAux: PoliticaAnotarConsultar) {
    this._router.navigate(['/paginas/anotacion/politica'], { state: { politica_id: politicaAux.politica_id } })
  }

  ngOnInit() {
    this.consultarPoliticasAnotar();
  }


}
