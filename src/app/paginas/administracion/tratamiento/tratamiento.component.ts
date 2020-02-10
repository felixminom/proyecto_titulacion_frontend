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

  constructor(public dialog: MatDialog,
    private readonly tratamientoService: TratamientoService) { }


  editarTratamiento(tratatamientoEditar: any) {
    const dialogoEditar = this.dialog.open(TratamientoDialogoComponent, {
      width: '40%',
      height: '55%',
      data: {
        datos: tratatamientoEditar,
        nuevo: false
      }
    });

    dialogoEditar.afterClosed().subscribe(
      result => {
        console.log("RESULTADO: ", result)
      });
  }

  nuevoTratamientoDialogo() {
    const dialogoNuevo = this.dialog.open(TratamientoDialogoComponent, {
      width: '40%',
      height: '55%',
      data: {
        datos: this.tratamientoAux,
        nuevo: true
      }
    })

    dialogoNuevo.afterClosed().subscribe(
      result => {
        this.tratamientoAux = {
          id: null,
          descripcion: '',
          color_primario: ''
        }
        console.log("RESULTADO: ", result)
      });
  }

  aplicarFiltro(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase()
  }

  consultarTratamientos() {
    this.tratamientoService.obtenerTratamientos().subscribe(
      result => {this.dataSource = new MatTableDataSource(result)},
      errorResponse => { console.log(errorResponse) }
    )
  }

  ngOnInit(): void {
    this.consultarTratamientos();

  }

}

