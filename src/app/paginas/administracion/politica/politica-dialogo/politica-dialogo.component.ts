import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
export class PoliticaDialogoComponent implements OnInit {
  
  //variables qeu necesitan ser inicializadas
  date = new Date().toLocaleString([],{month:"2-digit",day: "2-digit", year:"numeric"});
  nombreArchivo = '';
  archivoPolitica : File = null;
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
  nombre= new FormControl('',[Validators.required]);
  url = new FormControl('', [Validators.required]);
  fecha = new FormControl('', [Validators.required]);

  constructor(
    private dialogoInterno: MatDialogRef<PoliticaDialogoComponent>,
    private dialogo : MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    @Inject(DOCUMENT) private documento: Document,
    private politicaService : PoliticaService
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
    return this.nombre.hasError('required') ? 'Ingrese un valor':
    '';
  }

  errorUrl() {
    return this.url.hasError('required')? 'Ingrese un valor':
    '';
  }

  errorFecha() {
    return this.fecha.hasError('required') ? 'Escoja una fecha':
    '';
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
    let archivo = this.documento.getElementById("archivo");
    archivo.click()
  }

  previsualizarPolitica(){
    if(this.formulario.valid){
      this.formulario.value.fecha = this.formulario.value.fecha.format().split('T')[0];
      
      this.politicaService.previsualizacionPolitica(this.formulario.value, this.archivoPolitica)
      .subscribe(
        result => {
          this.dialogoPrevisualizar(result,this.formulario.value)
          this.formulario.reset();
          this.archivoPolitica = null;
          this.nombreArchivo = '';
          this.archivoEscogido = false;
        }
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
    })
  }

  ngOnInit() {
  }

}
