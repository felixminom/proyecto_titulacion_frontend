import { Component, OnInit } from '@angular/core';
import {AnotacionResultado} from './usuario-anotacion'
import { UsuarioAnotacionService } from './usuario-anotacion.service';


@Component({
  selector: 'app-usuario-anotacion',
  templateUrl: './usuario-anotacion.component.html',
  styleUrls: ['./usuario-anotacion.component.css']
})
export class UsuarioAnotacionComponent implements OnInit {

  anotaciones: AnotacionResultado = new AnotacionResultado(null, null);

  constructor(
    private _usuarioAnotacionService : UsuarioAnotacionService)
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
