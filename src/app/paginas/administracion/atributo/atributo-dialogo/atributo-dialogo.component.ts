import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ThrowStmt } from '@angular/compiler';
import { Atributo } from '../atributo';

@Component({
  selector: 'app-atributo-dialogo',
  templateUrl: './atributo-dialogo.component.html',
  styleUrls: ['./atributo-dialogo.component.css']
})
export class AtributoDialogoComponent implements OnInit {

  atributoAux : Atributo;
  formulario: FormGroup;
  nuevo:boolean;
  titulo:string;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.atributoAux = data.atributo
    this.formulario = this.crearFormulario(this.atributoAux);
    this.nuevo = data.nuevo;
    if (this.nuevo) {
      this.titulo = 'Creación de Tratamiento'
    } else {
      this.titulo = 'Edicion de Tratamiento'

    }
  }

  crearFormulario(atributoAux : Atributo) {
    return this.fb.group({
      descripcion: new FormControl(atributoAux.descripcion, [Validators.required]),
      tratamiento_id: new FormControl(atributoAux.tratamiento_id, [Validators.required])
    })
  }

  guardar(){
    if(this.formulario.valid){
      console.log(this.formulario.value)
    }else{
      alert("Revise los campos de formulario")
    }
    
  }

  ngOnInit() {
  }

}
