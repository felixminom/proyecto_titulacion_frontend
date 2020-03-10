import { Component, Injectable, Output, OnInit, EventEmitter, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { TratamientoService } from 'src/app/paginas/administracion/tratamiento/tratamiento.service';
import { ThemePalette } from '@angular/material';
import { DOCUMENT } from '@angular/common';

export class TratamientoNodo {
  id: number;
  descripcion: string;
  color_primario: string;
  hijos?: TratamientoNodo[];
}

/** Flat to-do item node with expandable and level information */
export class TratamientoNodoPlano {
  level: number;
  expandable: boolean;
  id: number;
  descripcion: string;
  color_primario: string;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA: TratamientoNodo[] = []

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TratamientoNodo[]>([]);

  get data(): TratamientoNodo[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }


  buildFileTree(obj: { [key: string]: any }, level: number): TratamientoNodo[] {
    return Object.keys(obj).reduce<TratamientoNodo[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TratamientoNodo();
      node.descripcion = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.hijos = this.buildFileTree(value, level + 1);
        } else {
          node.descripcion = value;
        }
      }
      return accumulator.concat(node);

    }, []);
  }

  insertItem(parent: TratamientoNodo, name: string) {
    if (parent.hijos) {
      parent.hijos.push({ descripcion: name } as TratamientoNodo);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TratamientoNodo, name: string) {
    node.descripcion = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-tree-view-check',
  templateUrl: './tree-view-check.component.html',
  styleUrls: ['./tree-view-check.component.css'],

})
export class TreeViewCheckComponent implements OnInit {

  @Output() listaSeleccionada = new EventEmitter<SelectionModel<TratamientoNodoPlano>>();
  @Output() permite = new EventEmitter<boolean>();

  color: ThemePalette = "warn";
  permiteAux = false;
  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TratamientoNodo, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.descripcion === node.descripcion
      ? existingNode
      : new TratamientoNodoPlano();
    flatNode.id = node.id;
    flatNode.descripcion = node.descripcion;
    flatNode.color_primario = node.color_primario;
    flatNode.level = level;
    flatNode.expandable = !!node.hijos;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TratamientoNodoPlano, TratamientoNodo>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TratamientoNodo, TratamientoNodoPlano>();

  /** A selected parent node to be inserted */
  selectedParent: TratamientoNodoPlano | null = null;

  treeControl = new FlatTreeControl<TratamientoNodoPlano>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener<TratamientoNodo, TratamientoNodoPlano>(
    this.transformer, node => node.level, node => node.expandable, node => node.hijos);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TratamientoNodoPlano>(true /* multiple */);

  constructor(
    private readonly tratamientoService: TratamientoService,
    @Inject(DOCUMENT) private documento: Document
  ) {

    this.dataSource.data = TREE_DATA;
  }

  getLevel = (node: TratamientoNodoPlano) => node.level;

  isExpandable = (node: TratamientoNodoPlano) => node.expandable;

  getChildren = (node: TratamientoNodo): TratamientoNodo[] => node.hijos;

  hasChild = (_: number, _nodeData: TratamientoNodoPlano) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TratamientoNodoPlano) => _nodeData.descripcion === '';


  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TratamientoNodoPlano): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;

  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TratamientoNodoPlano): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TratamientoNodoPlano): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);

    this.listaSeleccionada.emit(this.checklistSelection)
  }


  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TratamientoNodoPlano): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    this.listaSeleccionada.emit(this.checklistSelection)
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TratamientoNodoPlano): void {
    let parent: TratamientoNodoPlano | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TratamientoNodoPlano): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TratamientoNodoPlano): TratamientoNodoPlano | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  consultarTratamientos() {
    return this.tratamientoService.obtenerTratamientosCompletos().subscribe(
      result => {
        this.dataSource.data = result
        //this.treeControl.expandAll()
        for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
          if (this.treeControl.dataNodes[i].level == 0) {
            this.todoItemSelectionToggle(this.treeControl.dataNodes[i]);
            this.treeControl.expand(this.treeControl.dataNodes[i])
          }
          if (this.treeControl.dataNodes[i].level == 2) {
            this.todoItemSelectionToggle(this.treeControl.dataNodes[i]);
            this.treeControl.expand(this.treeControl.dataNodes[i])
          }
        }
      },
      errorResponse => { console.log(errorResponse) }
    )
  }

  emitirCheck(){
    this.permiteAux = !this.permiteAux
    this.permite.emit(this.permiteAux)
  }


  ngOnInit() {
    this.consultarTratamientos();
  }
}
