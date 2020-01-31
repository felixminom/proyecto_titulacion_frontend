import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PoliticaDialogoComponent } from './politica-dialogo/politica-dialogo.component';
import { PoliticaGuardar} from './politica'

@Component({
  selector: 'app-politica',
  templateUrl: './politica.component.html',
  styleUrls: ['./politica.component.css']
})
export class PoliticaComponent implements OnInit {

  date = new Date().toLocaleDateString([],{day: "2-digit", month:"2-digit", year:"numeric"});
  politicaNuevaAux = new PoliticaGuardar('','',this.date)

  constructor(
   private dialogo : MatDialog
  ) { }

  nuevaPolitica(){
    const NuevaPolticaDiaologo = this.dialogo.open(PoliticaDialogoComponent,{
      width: '50%',
      height: '75%',
      data:{
        politica: this.politicaNuevaAux,
        nuevo: true
      }
    })

    NuevaPolticaDiaologo.afterClosed().subscribe(
      resultado =>{
        console.log("Resultado: ", resultado)
      }
    )
  }

  ngOnInit() {
    
  }

 
}
