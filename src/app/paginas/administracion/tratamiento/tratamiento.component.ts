import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TratamientoDialogoComponent } from './tratamiento-dialogo/tratamiento-dialogo.component';
import { TratamientoService } from './tratamiento.service';
import { TratamientoConsultar } from './tratamiento';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { NotificacionComponent } from 'src/app/notificacion/notificacion.component';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent {

  tratamientoAux = new TratamientoConsultar(null, null, 0,null);

  displayedColumns = ['id', 'descripcion', 'color_primario', 'editar', 'eliminar'];
  listaTratamientos: MatTableDataSource<TratamientoConsultar>;

  constructor(
    private _dialogo: MatDialog,
    private _tratamientoService: TratamientoService,
    private _notificacion : MatSnackBar,
    ) {
      this.consultarTratamientos();
    }


  editarTratamiento(tratatamientoEditar: any) {
    const dialogoEditar = this._dialogo.open(TratamientoDialogoComponent, {
      width: '40%',
      height: 'fit-content',
      data: {
        tratamientoAux: tratatamientoEditar,
        nuevo: false
      }
    });

    dialogoEditar.afterClosed().subscribe(
      () => this.consultarTratamientos()
    )
  }

  nuevoTratamientoDialogo() {
    const dialogoNuevo = this._dialogo.open(TratamientoDialogoComponent, {
      width: '40%',
      height: 'fit-content',
      data: {
        tratamientoAux: this.tratamientoAux,
        nuevo: true
      }
    })

    dialogoNuevo.afterClosed().subscribe(
      () => this.consultarTratamientos()
    )
  }

  eliminarTratamiento(tratamientoId : number){
    if (confirm("Esta seguro de eliminar este tratamiento?\nRecuerde que esta acción no podra revertirse")){
      this._tratamientoService.eliminarTratamiento(tratamientoId).subscribe(
        () => {
          this.notificacion("Tratamiento eliminado con exito!", "exito-snackbar")
          this.consultarTratamientos()
        },
        () => this.notificacion("ERROR eliminando tratamiento!", "fracaso-snackbar")
      )
    }
    
  }

  aplicarFiltro(valor: string) {
    this.listaTratamientos.filter = valor.trim().toLowerCase()
  }

  consultarTratamientos() {
    this._tratamientoService.obtenerTratamientos().subscribe(
      (tratamientos : TratamientoConsultar[]) => {
        this.listaTratamientos = new MatTableDataSource(tratamientos)
        this.listaTratamientos.filterPredicate = function(data, filter : string): boolean {
          console.log("estoy en filter predicate")
          return data.descripcion.toLowerCase().includes(filter)
        }
      },
      () => alert('No ha sido posible cargar la lista de tratamientos')
    )
  }

  notificacion(mensaje : string, estilo : string){
    this._notificacion.openFromComponent(NotificacionComponent, {
      data: mensaje,
      panelClass: [estilo],
      duration: 2000,
      verticalPosition: 'top'
    })
  }
}

