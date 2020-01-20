import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TratamientoDialogoComponent } from './tratamiento-dialogo/tratamiento-dialogo.component';
import { TratamientoService } from './tratamiento.service';
import { TratamientoNumeracion, Tratamiento } from './tratamiento';
import { MatTableDataSource, MatSort } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Alert } from 'selenium-webdriver';


declare function primeraFuncion(n1: number, n2: number): number;

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {

  tratamientoAux: Tratamiento;

  displayedColumns = ['id', 'descripcion', 'color_primario', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<Tratamiento>;

  constructor(public dialog: MatDialog,
    private readonly tratamientoService: TratamientoService) { }

  ngOnInit(): void {
    this.consultarTratamientos();
    console.log(primeraFuncion(1, 2))

  }


  editarTratamiento(elemento: any) {
    const dialogoEditar = this.dialog.open(TratamientoDialogoComponent, {
      width: '40%',
      height: '55%',
      data: {
        datos: elemento,
        nuevo: false
      }
    });

    dialogoEditar.afterClosed().subscribe(
      result => {
        console.log("RESULTADO: ", result)
      });
  }

  nuevoTratamientoDialogo() {
    const dialogoEditar = this.dialog.open(TratamientoDialogoComponent, {
      width: '40%',
      height: '55%',
      data: {
        datos: this.tratamientoAux,
        nuevo: true
      }
    })

    dialogoEditar.afterClosed().subscribe(
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
    return this.tratamientoService.obtenerTratamientos().subscribe(result => {
      this.dataSource = new MatTableDataSource(result)
    },
      errorResponse => { console.log(errorResponse) },
      () => {
        this.dataSource.filterPredicate =
          (data: Tratamiento, filtroJson: string): boolean => {
            return data.descripcion.toLowerCase().includes(filtroJson) || data.id.toString().toLowerCase().includes(filtroJson)
          }
      }
    )
  }


}
