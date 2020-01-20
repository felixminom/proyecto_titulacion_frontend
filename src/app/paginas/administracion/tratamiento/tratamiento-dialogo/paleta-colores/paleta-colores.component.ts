import { Component, OnInit, Inject } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import {ColorService} from './paleta-colores.service'
import {Color} from './color'

@Component({
  selector: 'app-paleta-colores',
  templateUrl: './paleta-colores.component.html',
  styleUrls: ['./paleta-colores.component.css']
})
export class PaletaColoresComponent {

  @Input() cabecera: string;
  @Input() color_primario: string;
  @Input() id : number;
  @Output() event = new EventEmitter();

  formulario: FormGroup;
  
  constructor(
    private fb :FormBuilder,
    private dialog: MatDialogRef<PaletaColoresComponent>,
    private readonly colorService: ColorService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.color_primario = data.color_primario;
    this.id = null;
    this.cabecera = 'Color Primario'
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      id: [this.id],
      color_primario:[this.color_primario]
    })
    this.consultarColoresDisponibles();
  }

  public show = true;

  public defaultColors: Color[];
  /*[
    {
      codigo: '#8E44AD',
    },
    {
      codigo: '#992288',
    },
    {
      codigo: '#7c90c1',
    },
    {
      codigo: '#9d8594',
    },
    {
      codigo: '#4b4fce',
    },
    {
      codigo: '#4e0a77',
    },
    {
      codigo: '#a367b5',
    },
    {
      codigo: '#ee3e6d',
    },
    {
      codigo: '#f46600',
    },
    {
      codigo: '#cf0500',
    },
    {
      codigo: '#8e0622',

    },
    {
      codigo: '#f0b89a',
    },
    {
      codigo: '#f0ca68',
    },
    {
      codigo: '#62382f',
    },
    {
      codigo: '#c1800b'
    }
    
  ];*/

  /**
   * Change color from default colors
   * @param {string} color
   */
  public changeColor(color: string): void {
    this.color_primario = color;
    this.id = this.defaultColors.find(x => x.codigo == color).id;
    this.formulario = this.fb.group({
      id: [this.id],
      color_primario:[this.color_primario]
    })
    console.log(this.id)
    this.event.emit(this.color_primario);
  }

  guardarColor(){
    this.dialog.close(this.formulario.value)
  }

  estiloAnotacion(colorAux):Object{
    return {
      'color': colorAux,
      'font-weight': 'bold'
    }
  }

  consultarColoresDisponibles(){
    return this.colorService.ObtenerColoresDisponibles().subscribe(
      result => {this.defaultColors = result}
    )
  }
}
