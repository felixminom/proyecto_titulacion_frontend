import { Component, OnDestroy, OnInit} from '@angular/core';
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


  displayedColumns = ['id','descripcion','color_primario','editar','eliminar'];
  tratamientos:Tratamiento[];
  /*tratamientos = [
    {
      id:1,
      descripcion: 'Recolección de datos Personales',
      color_primario: '#FF00FF'
    },
    {
      id:2,
      descripcion: 'Comparticion de datos Personales',
      color_primario: '#EE4030'
    },
    {
      id:3,
      descripcion: 'Retencion de datos',
      color_primario: '#35F23A'
    }
  ]*/

  dataSource = new MatTableDataSource(this.tratamientos);

  constructor(public dialog:MatDialog, 
    private readonly tratamientoService:TratamientoService ) { }

    
  editar(elemento: any){
    const dialogoEditar = this.dialog.open(TratamientoDialogoComponent,{
      width:'40%',
      height:'52%',
      data:{datos:elemento}
    });

    dialogoEditar.afterClosed().subscribe(
      result=>{ console.log("RESULTADO: ", result)
    }); 

  }

  consultarTratamientos(){ 
    return this.tratamientoService.obtenerTratamientos().subscribe(result=>{
      this.tratamientos = result;
    })
  }

  ngOnInit(): void {
   this.consultarTratamientos();
  }
}
