import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { PoliticaDialogoComponent } from './politica-dialogo/politica-dialogo.component';
import { PoliticaGuardar, PoliticaConsultar} from './politica'
import { PoliticaService } from './politica.service';
import { AsignarPoliticaComponent } from './asignar-politica/asignar-politica.component';
import { DatePipe } from '@angular/common';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';
import { runInThisContext } from 'vm';
import { concat } from 'rxjs';

@Component({
  selector: 'app-politica',
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.css']
})
export class PoliticaComponent{

  date = new Date()
  fecha = this._datePipe.transform(this.date, 'yyyy/MM/dd')
  politicaNuevaAux = new PoliticaGuardar('','',this.fecha)

  dataSource: MatTableDataSource<PoliticaConsultar>;
  displayedColumns = ['id', 'nombre', 'url','fecha', 'editar', 'eliminar', 'asignar'];

  constructor(
   private _dialogo : MatDialog,
   private _politicaService : PoliticaService,
   private _datePipe : DatePipe,
   private _notificacion : MatSnackBar
  ) { 
    this.consultarPoliticas()
  }

  consultarPoliticas(){
    this._politicaService.consultarPoliticas().subscribe(
      resultado => this.dataSource = new MatTableDataSource(resultado)
    )
  }

  nuevaPolitica(){
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

  eliminarPolitica(politica : PoliticaConsultar){
    if (confirm("Esta seguro de eliminar esta politica?\nRecuerde que esta acción no podra revertirse")){
      this._politicaService.eliminarPolitica(politica.id).subscribe(
        () => {
          this.notificacion('Politica eliminada con exito!','exito-snackbar')
        },
        error =>  this.notificacion('ERROR al eliminar politica!','fracaso-snackbar')
      )
    }
   
  }

  asignarPolitica(politicaAux: PoliticaConsultar){
    const asignarPoliticaDialogo = this._dialogo.open(AsignarPoliticaComponent, {
      width: '40%',
      height: '80%',
      data:{
        politica: politicaAux,
      }
    })

    asignarPoliticaDialogo.afterClosed().subscribe(
      () => this.consultarPoliticas()
    )
  }

  aplicarFiltro(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase()
  }

  notificacion(mensaje : string, estilo : string, action?:string){
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      panelClass: [estilo],
      duration: 5000,
      verticalPosition: 'top'
      })
  }

}
