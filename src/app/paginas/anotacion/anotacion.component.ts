import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Tratamiento } from '../administracion/tratamiento/tratamiento';
import { TratamientoService } from '../administracion/tratamiento/tratamiento.service';

@Component({
  selector: 'app-anotacion',
  templateUrl: './anotacion.component.html',
  styleUrls: ['./anotacion.component.css']
})
export class AnotacionComponent implements OnInit {

  constructor(
    private readonly tratamientoService : TratamientoService
  ) { }

  ngOnInit() {
    this.consultarTratamientos();
  }

  tratamientoControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  tratamientos: Tratamiento[];

  consultarTratamientos(){ 
    return this.tratamientoService.obtenerTratamientos().subscribe(result=>{
      this.tratamientos = result;
    })
  }

}
