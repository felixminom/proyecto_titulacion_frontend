import { Component, OnInit } from '@angular/core';
import {AnotacionResultado} from 'src/app/paginas/anotacion/anotacion'
import { AnotacionService } from '../../anotacion/anotacion.service';


@Component({
  selector: 'app-usuario-anotacion',
  templateUrl: './usuario-anotacion.component.html',
  styleUrls: ['./usuario-anotacion.component.css']
})
export class UsuarioAnotacionComponent implements OnInit {

  anotaciones: AnotacionResultado = new AnotacionResultado(null, null);

  constructor(
    private _usuarioAnotacionService : AnotacionService
    )
    {
      this.consultarAnotaciones()
    }

  consultarAnotaciones(){
    this._usuarioAnotacionService.obtenerAnotacionesAnotadores(12,1).subscribe(
      (resultado : AnotacionResultado) => {
        this.anotaciones = resultado
        console.log(this.anotaciones)
      },
      error => console.log(error)
    )
  }

  ngOnInit() {

  }

}
