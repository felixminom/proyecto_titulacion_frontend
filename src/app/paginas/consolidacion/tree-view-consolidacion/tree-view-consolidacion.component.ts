import { Component, OnInit, Injectable, EventEmitter, Output, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { TratamientoService } from '../../administracion/tratamiento/tratamiento.service';
import { ThemePalette } from '@angular/material';

export class TodoItemNode {
  id: number;
  descripcion: string;
  color_primario: string;
  hijos?: TodoItemNode[];
}

export class TodoItemFlatNode {
  level: number;
  expandable: boolean;
  id: number;
  descripcion: string;
  color_primario: string;
}


const TREE_DATA: TodoItemNode[] = []

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

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

  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
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

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.hijos) {
      parent.hijos.push({ descripcion: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }
}


@Component({
  selector: 'app-tree-view-consolidacion',
  templateUrl: './tree-view-consolidacion.component.html',
  styleUrls: ['./tree-view-consolidacion.component.css'],

})
export class TreeViewConsolidacionComponent implements OnInit {

  @Output() listaSeleccionada = new EventEmitter<SelectionModel<TodoItemFlatNode>>();
  @Output() permite = new EventEmitter<boolean>();

  color: ThemePalette = "warn";
  permiteAux = false;
  /**
 * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
 */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.descripcion === node.descripcion
      ? existingNode
      : new TodoItemFlatNode();
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
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  treeControl = new FlatTreeControl<TodoItemFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener<TodoItemNode, TodoItemFlatNode>(
    this.transformer, node => node.level, node => node.expandable, node => node.hijos);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  constructor(
    private readonly tratamientoService: TratamientoService
  ) {
    this.dataSource.data = TREE_DATA;
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.hijos;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.descripcion === '';

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;

  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
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
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    this.listaSeleccionada.emit(this.checklistSelection)
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
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
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
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
    return this.tratamientoService.obtenerTratamientosCompletos().subscribe(result => {
      this.dataSource.data = result
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
