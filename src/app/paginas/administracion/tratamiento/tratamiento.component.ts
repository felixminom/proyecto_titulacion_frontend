import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TratamientoDialogoComponent } from './tratamiento-dialogo/tratamiento-dialogo.component';
import { TratamientoService } from './tratamiento.service';
import { Tratamiento } from './tratamiento';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {

  tratamientoAux = new Tratamiento(null, '', '');

  displayedColumns = ['id', 'descripcion', 'color_primario', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<Tratamiento>;

  constructor(
    private _dialogo: MatDialog,
    private _tratamientoService: TratamientoService) 
    { }


  editarTratamiento(tratatamientoEditar: any) {
    const dialogoEditar = this._dialogo.open(TratamientoDialogoComponent, {
      width: '40%',
      height: '55%',
      data: {
        datos: tratatamientoEditar,
        nuevo: false
      }
    });

    dialogoEditar.afterClosed().subscribe(
      resultado => {
        console.log("RESULTADO: ", resultado)
      });
  }

  nuevoTratamientoDialogo() {
    const dialogoNuevo = this._dialogo.open(TratamientoDialogoComponent, {
      width: '40%',
      height: '55%',
      data: {
        datos: this.tratamientoAux,
        nuevo: true
      }
    })

    dialogoNuevo.afterClosed().subscribe(
      resultado => {
        this.tratamientoAux = {
          id: null,
          descripcion: '',
          color_primario: ''
        }
        console.log("RESULTADO: ", resultado)
      });
  }

  aplicarFiltro(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase()
  }

  consultarTratamientos() {
    this._tratamientoService.obtenerTratamientos().subscribe(
      resultado => {this.dataSource = new MatTableDataSource(resultado)},
      errorResponse => { console.log(errorResponse) }
    )
  }

  ngOnInit(): void {
    this.consultarTratamientos();

  }

}

