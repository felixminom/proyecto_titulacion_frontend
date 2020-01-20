import { Component, OnInit } from '@angular/core';
import { Valor } from './valor'
import { FormControl, Validators } from '@angular/forms';
import { Tratamiento } from '../tratamiento/tratamiento';
import { TratamientoService } from '../tratamiento/tratamiento.service';
import { Atributo } from '../atributo/atributo';
import { TouchSequence } from 'selenium-webdriver';
import { AtributoService } from '../atributo/atributo.service';
import { resource } from 'selenium-webdriver/http';
import { ValorService } from './valor.service';

@Component({
  selector: 'app-valor',
  templateUrl: './valor.component.html',
  styleUrls: ['./valor.component.css']
})
export class ValorComponent implements OnInit {

  constructor(
    private readonly tratamientoService: TratamientoService,
    private readonly atributoService : AtributoService,
    private readonly valorService : ValorService
  ) { }

  ngOnInit() {
    this.consultarTratamientos();
  }

  displayedColumns = ['id','descripcion','color_primario','editar','eliminar']
  valores: Valor[];

  tratamientoControl = new FormControl('', [Validators.required]);
  //tratamientoFormControl = new FormControl('', Validators.required);
  tratamientos: Tratamiento[];

  atributoControl = new FormControl('', [Validators.required]);
  //atributoFormControl = new FormControl('', Validators.required);
  atributos : Atributo[];

  error: any;

  consultarTratamientos(){ 
    return this.tratamientoService.obtenerTratamientos().subscribe(
      (resultado : Tratamiento[])=>this.tratamientos = resultado),
      error => this.error = error
  }

  consultarAtributosTratamiento(tratamientoId : number){
    return this.atributoService.obtenerAtributosTratamiento(tratamientoId).subscribe(
      (resultado : Atributo[]) => this.atributos = resultado),
      error => this.error = error;
  }

  consultarValores(){
    return this.valorService.obtenerValores().subscribe(
      (resultado : Valor[]) => this.valores = resultado),
      error => this.error = error
  }

  consultarValoresAtributo(atributoId : number){
    return this.valorService.obtenerValoresAtributo(atributoId).subscribe(
      (resultado : Valor[]) => this.valores = resultado),
      error => this.error = error
  }

  seleccionarAtributos(tratamiento: Tratamiento){
    this.vaciarAtributos();
    this.consultarAtributosTratamiento(tratamiento.id);
    console.log(tratamiento.id + ' ' + tratamiento.descripcion)
  }

  seleccionarValores(atributo : Atributo){
    this.valores = [];
    this.consultarValoresAtributo(atributo.id);
  }

  vaciarAtributos(){
    this.atributos = [];
    this.valores = [];
  }

}
