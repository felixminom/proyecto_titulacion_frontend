import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { LoginService } from 'src/app/login/login.service';
import { LoginComponent } from 'src/app/login/login.component';

interface Nodo {
  nombre: string;
  icono: string;
  hijos?: Nodo[];
  path? : string;
}

const TREE_DATA: Nodo[] = [
  {
    nombre: 'Administracion',
    icono: 'build',
    hijos: [
      {
        nombre: 'Usuarios',
        icono: 'account_circle',
        hijos:[],
        path: '/paginas/administracion/usuarios'
      },
      {
        nombre: 'Politicas',
        icono: 'menu_book',
        hijos: [],
        path: '/paginas/administracion/politicas'
      },
      {
        nombre: 'Tratamientos',
        icono: 'highlight',
        path: '/paginas/administracion/tratamientos'
      },
      {
        nombre: 'Atributos',
        icono: 'format_list_bulleted',
        path: '/paginas/administracion/atributos'
      },
      {
        nombre: 'Valores',
        icono:'format_list_numbered',
        path: '/paginas/administracion/valores'
      }
    ]
  },
  {
    nombre: 'Consolidacion',
    icono: 'book',
    hijos: [],
    path: '/paginas/consolidacion'
  },
  {
    nombre:'Anotacion',
    icono: 'create',
    hijos:[],
    path: '/paginas/anotacion'
  }
];

interface ExampleFlatNode {
  expandable: boolean;
  nombre: string;
  level: number;
}

@Component({
  selector: 'app-tree-view',
  templateUrl: 'tree-view.component.html',
  styleUrls: ['tree-view.component.css'],
})
export class TreeViewComponent {

  @Input() modulos : Nodo[] = [];

  private _transformer = (node: Nodo, level: number) => {
    return {
      expandable: !!node.hijos && node.hijos.length > 0,
      nombre: node.nombre,
      level: level,
      icono: node.icono,
      path: node.path
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.hijos);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(

  ) {
    this.dataSource.data = this.modulos;
    console.log("constructor")
    console.log(this.modulos)
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.dataSource.data = this.modulos;
    console.log("init")
    console.log(this.modulos)
  }

}
