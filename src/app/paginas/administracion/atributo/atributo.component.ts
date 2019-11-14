import { Component, OnInit } from '@angular/core';
import { Atributo } from './atributo';
import { Tratamiento} from '../tratamiento/tratamiento'
import {TratamientoService} from '../tratamiento/tratamiento.service'
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-atributo',
  templateUrl: './atributo.component.html',
  styleUrls: ['./atributo.component.css']
})

export class AtributoComponent implements OnInit {

  constructor(
    private readonly tratamientoService: TratamientoService
  ) { }
  
  ngOnInit() {
    this.consultarTratamientos();
  }

  displayedColumns =['id','descripcion','color_primario','editar','eliminar']
  atributos : Atributo[] = [
    {
    id : 1,
    descripcion: 'datos 1',
    color_primario: '#252525'
    },
    {
      id : 1,
      descripcion: 'datos 1',
      color_primario: '#252525'
    },
  ]
  
  tratamientoControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  tratamientos: Tratamiento[];

  consultarTratamientos(){ 
    return this.tratamientoService.obtenerTratamientos().subscribe(result=>{
      this.tratamientos = result;
    })
  }

  vaciarAtributos(){
    this.atributos = [];
  }

  seleccionarAtributos(tratamiento: Tratamiento){
    console.log(tratamiento.id + ' ' + tratamiento.descripcion)
  }

}
