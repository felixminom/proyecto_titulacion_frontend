import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { PoliticaDialogoComponent } from './politica-dialogo/politica-dialogo.component';
import { PoliticaGuardar, PoliticaConsultar} from './politica'
import { PoliticaService } from './politica.service';
import { AsignarPoliticaComponent } from './asignar-politica/asignar-politica.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-politica',
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.css']
})
export class PoliticaComponent implements OnInit {

  date = new Date()
  fecha = this._datePipe.transform(this.date, 'yyyy/MM/dd')
  politicaNuevaAux = new PoliticaGuardar('','',this.fecha)

  dataSource: MatTableDataSource<PoliticaConsultar>;
  displayedColumns = ['id', 'nombre', 'url','fecha', 'editar', 'eliminar', 'asignar'];

  constructor(
   private _dialogo : MatDialog,
   private _politicaService : PoliticaService,
   private _datePipe : DatePipe
  ) { 
  }

  consultarPoliticas(){
    this._politicaService.consultarPoliticas().subscribe(
      resultado => this.dataSource = new MatTableDataSource(resultado)
    )
  }

  nuevaPolitica(){
    console.log(this.politicaNuevaAux)
    const NuevaPolticaDiaologo = this._dialogo.open(PoliticaDialogoComponent,{
      width: '50%',
      height: '65%',
      data:{
        politica: this.politicaNuevaAux,
        nuevo: true
      }
    })

    NuevaPolticaDiaologo.afterClosed().subscribe(
      () => this.consultarPoliticas()
    )
  }

  editarPolitica(politicaAux : PoliticaConsultar){
    const editarPoliticaDialogo = this._dialogo.open(PoliticaDialogoComponent, {
      width: '50%',
      height: '65%',
      data:{
        politica: politicaAux,
        nuevo: false
      }
    })

    editarPoliticaDialogo.afterClosed().subscribe(
      () => this.consultarPoliticas()
    )
  }

  asignarPolitica(politicaAux: PoliticaConsultar){
    const editarPoliticaDialogo = this._dialogo.open(AsignarPoliticaComponent, {
      width: '40%',
      height: '80%',
      data:{
        politica: politicaAux,
      }
    })
  }

  aplicarFiltro(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase()
  }

  ngOnInit() {
    this.consultarPoliticas()
  }

 
}
