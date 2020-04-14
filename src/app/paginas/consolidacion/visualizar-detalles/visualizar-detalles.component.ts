import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PoliticaAnotarConsultar } from '../../administracion/politica/politica';

@Component({
  selector: 'app-visualizar-detalles',
  templateUrl: './visualizar-detalles.component.html',
  styleUrls: ['./visualizar-detalles.component.css']
})
export class VisualizarDetallesComponent implements OnInit {

  politica : PoliticaAnotarConsultar

  listaInteranotador = {
    coeficiente : 67,
    anotadores:[
      {
        email: 'felix@gmail.com',
        total_anotaciones: 23
      },
      {
        email: 'felix2@gmail.com',
        total_anotaciones: 25
      }
    ]
  }

  displayedColumns = ['id','anotador','total_anotaciones']
  constructor(
    @Inject(MAT_DIALOG_DATA) private data : any
  ) {
    this.politica = data.politicaAux
    console.log(this.politica)
   }

  ngOnInit() {
    console.log(this.listaInteranotador.coeficiente)
  }

}
