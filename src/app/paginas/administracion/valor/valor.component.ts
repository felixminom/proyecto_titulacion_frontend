import { Component, OnInit } from '@angular/core';
import { Valor } from './valor'
import { FormControl, Validators } from '@angular/forms';
import { Tratamiento } from '../tratamiento/tratamiento';
import { TratamientoService } from '../tratamiento/tratamiento.service';
import { Atributo } from '../atributo/atributo';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-valor',
  templateUrl: './valor.component.html',
  styleUrls: ['./valor.component.css']
})
export class ValorComponent implements OnInit {

  constructor(
    private readonly tratamientoService: TratamientoService
  ) { }

  ngOnInit() {
    this.consultarTratamientos();
  }

  displayedColumns = ['id','descripcion','color_primario','editar','eliminar']
  valores: Valor[] =[
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

  atributoControl = new FormControl('', [Validators.required]);
  atributos : Atributo[] = [
    {
    id : 1,
    descripcion: 'datos 1',
    color_primario: '#333333'
    },
    {
      id : 1,
      descripcion: 'datos 1',
      color_primario: '#252525'
    },
  ]

  consultarTratamientos(){ 
    return this.tratamientoService.obtenerTratamientos().subscribe(result=>{
      this.tratamientos = result;
    })
  }

  seleccionarAtributos(tratamiento: Tratamiento){
    console.log(tratamiento.id + ' ' + tratamiento.descripcion)
  }

  vaciarAtributos(){
    this.atributos = [];
    this.valores = [];
  }

}
