import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  mensaje : string;
  
  constructor(
    public notificacionInterna : MatSnackBarRef<NotificacionComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data : any
  ) { 
    this.mensaje = data
  }

  ngOnInit() {
  }

}
