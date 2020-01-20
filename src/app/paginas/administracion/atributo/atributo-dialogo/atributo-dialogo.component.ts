import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-atributo-dialogo',
  templateUrl: './atributo-dialogo.component.html',
  styleUrls: ['./atributo-dialogo.component.css']
})
export class AtributoDialogoComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.crearFormulario();
    this.nuevo = data.nuevo;
    if (this.nuevo) {
      this.titulo = 'Creación de Tratamiento'
    } else {
      this.titulo = 'Edicion de Tratamiento'

    }
  }


  ngOnInit() {
  }

  formulario: FormGroup;
  nuevo:boolean;
  titulo:string;

  crearFormulario() {
    return new FormGroup({
      descripcion: new FormControl(''),
      tratamiento_id: new FormControl('')
    })
  }

}
