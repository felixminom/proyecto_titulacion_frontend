import { Component, OnInit } from '@angular/core';

interface Usuario {
  nombre: string;
  rol: string;
  anotacion? : Anotacion[]
}

interface Anotacion {
  categoria: string;
  texto: string;
}

const usuariosAux : Usuario[] = [
  {
   nombre: "ADMIN",
   rol: "admin",
   anotacion:[
     {
       categoria: "1",
       texto: "Anotacion 1"
     },
     {
      categoria: "2",
       texto: "Anotacion 1"

     }
   ]
  }
] 

@Component({
  selector: 'app-usuario-anotacion',
  templateUrl: './usuario-anotacion.component.html',
  styleUrls: ['./usuario-anotacion.component.css']
})
export class UsuarioAnotacionComponent implements OnInit {

  usuarios : Usuario[] = [
    {
     nombre: "ADMIN",
     rol: "admin",
     anotacion:[
       {
         categoria: "1",
         texto: "Anotacion 1"
       },
       {
        categoria: "2",
         texto: "Anotacion 2"
  
       }
     ]
    },
    {
      nombre: "ADMIN2",
      rol: "admin2",
      anotacion:[
        {
          categoria: "1",
          texto: "Anotacion 1"
        },
        {
         categoria: "2",
          texto: "Anotacion 2"
   
        }
      ]
     }

  ] 
 
  constructor() { }

  ngOnInit() {
  }

}
