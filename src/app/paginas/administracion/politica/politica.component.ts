import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { PoliticaDialogoComponent } from './politica-dialogo/politica-dialogo.component';
import { PoliticaGuardar, PoliticaConsultar} from './politica'

@Component({
  selector: 'app-politica',
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.css']
})
export class PoliticaComponent implements OnInit {

  politicas: PoliticaConsultar[] = [
    {
        "id": 12,
        "nombre": "Youtube 5",
        "url": "https://www.youtube.com/intl/es/about/policies/ 5",
        "fecha": "2020-01-20"
    },
    {
        "id": 13,
        "nombre": "Youtube 6",
        "url": "https://www.youtube.com/intl/es/about/policies/ 6",
        "fecha": "2020-01-20"
    },
    {
        "id": 14,
        "nombre": "Youtube 7",
        "url": "https://www.youtube.com/intl/es/about/policies/ 7",
        "fecha": "2020-01-20"
    }
]

  date = new Date().toLocaleDateString([],{day: "2-digit", month:"2-digit", year:"numeric"});
  politicaNuevaAux = new PoliticaGuardar('','',this.date)

  dataSource: MatTableDataSource<PoliticaConsultar>;
  displayedColumns = ['id', 'nombre', 'url','fecha', 'editar', 'eliminar'];

  constructor(
   private dialogo : MatDialog
  ) { 
    this.dataSource = new MatTableDataSource(this.politicas)
  }

  nuevaPolitica(){
    const NuevaPolticaDiaologo = this.dialogo.open(PoliticaDialogoComponent,{
      width: '50%',
      height: '65%',
      data:{
        politica: this.politicaNuevaAux,
        nuevo: false
      }
    })

    NuevaPolticaDiaologo.afterClosed().subscribe(
      resultado => {}
    )
  }

  ngOnInit() {
    
  }

 
}
