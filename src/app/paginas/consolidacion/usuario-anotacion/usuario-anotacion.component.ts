import { Component, OnInit, Input } from '@angular/core';
import { AnotacionResultado } from 'src/app/paginas/anotacion/anotacion'
import { AnotacionService } from '../../anotacion/anotacion.service';
import { UsuarioAnotacionService } from './usuario-anotacion.service';


@Component({
  selector: 'app-usuario-anotacion',
  templateUrl: './usuario-anotacion.component.html',
  styleUrls: ['./usuario-anotacion.component.css']
})
export class UsuarioAnotacionComponent implements OnInit {

  @Input() politicaId :number;
  @Input() secuencia : number;

  anotaciones: AnotacionResultado = new AnotacionResultado(null, null);

  constructor(
    private _usuarioAnotacionService: UsuarioAnotacionService
  ) {
    this._usuarioAnotacionService.obtenerAnotaciones().subscribe(
      anotacionesAux => this.anotaciones = anotacionesAux
    )
  }


  ngOnInit() {

  }

}
