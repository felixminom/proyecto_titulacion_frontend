import { Component , Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PoliticaGuardar, RespuestaPoliticaVisualizar} from '../politica';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import { DOCUMENT } from '@angular/common'
import {PoliticaService} from '../politica.service'
import { PrevisualizacionComponent} from '../previsualizacion/previsualizacion.component'


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-politica-dialogo',
  templateUrl: './politica-dialogo.component.html',
  styleUrls: ['./politica-dialogo.component.css'],
  providers:[
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class PoliticaDialogoComponent {
  
  //variables que necesitan ser inicializadas
  date = new Date().toISOString(); //.toLocaleString([],{month:"2-digit",day: "2-digit", year:"numeric"});
  nombreArchivo = '';
  archivoPolitica : File = null;
  //despliega el boton de guardar
  archivoEscogido: boolean = false;
  politicaAux : PoliticaGuardar = {
    nombre: '',
    url: '',
    fecha: this.date
  }

  //variables del dialogo
  nuevo: boolean;
  titulo: string;

  //variables del formulario
  formulario: FormGroup;
  formularioEnviar : FormGroup;
  nombre= new FormControl('',[Validators.required]);
  url = new FormControl('', [Validators.required]);
  fecha = new FormControl('', [Validators.required]);

  constructor(
    private dialogoInterno: MatDialogRef<PoliticaDialogoComponent>,
    private dialogo : MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    @Inject(DOCUMENT) private documento: Document,
    private politicaService : PoliticaService,
    private fb : FormBuilder
  ) {
    this.formulario = this.crearFormulario();
    this.politicaAux = data.politica
    this.nuevo = data.nuevo
    if(this.nuevo){
      this.titulo = 'Creacion de Politica'
    } else{
      this.titulo = 'Edicion de Politica'
    }
    
   }

  crearFormulario(){
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required])
    })
  }

  resetFormulario(){
    this.formulario.reset();
  }

  errorNombre() {
    return this.nombre.hasError('required') ? 'Ingrese un valor':'';
  }

  errorUrl() {
    return this.url.hasError('required')? 'Ingrese un valor': '';
  }

  errorFecha() {
    return this.fecha.hasError('required') ? 'Escoja una fecha': '';
  }

  onNoClick(): void {
    this.dialogoInterno.close();
  }

  escogerArchivo(archivo : FileList){
    this.archivoPolitica = archivo.item(0);
    this.nombreArchivo = this.archivoPolitica.name; 
    this.archivoEscogido = true;
  }

  subirArchivo(){
    this.archivoPolitica = null;
    let archivo = this.documento.getElementById("archivo");
    archivo.click()
  }

  previsualizarPolitica(){
    if(this.formulario.valid){
      this.formularioEnviar = this.fb.group({
        nombre : this.formulario.value.nombre,
        fecha: this.formulario.value.fecha.toISOString(),
        url : this.formulario.value.url
      })
      
      this.politicaService.previsualizacionPolitica(this.formularioEnviar.value, this.archivoPolitica)
      .subscribe(
        resultado => this.dialogoPrevisualizar(resultado,this.formulario.value)
        )
    }else{
      alert('El formulario contiene errores, por favor corrijalo')
    }
  }

  dialogoPrevisualizar(politicaRespuesta : RespuestaPoliticaVisualizar, politicaGuardarAux : PoliticaGuardar ){
    const NuevaPoliticaVisualizar = this.dialogo.open(PrevisualizacionComponent,{
      width: '60%',
      height: '85%',
      data:{
        politicaVisualizar: politicaRespuesta,
        politicaGuardar : politicaGuardarAux
      }
    });

    NuevaPoliticaVisualizar.afterClosed().subscribe(
      result => {
        if(result.guardar){
          this.dialogoInterno.close()
        }
      }
    )
  }

}
