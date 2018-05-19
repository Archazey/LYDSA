import { Component, OnInit, Input } from '@angular/core';

// models
import { TreeElement } from '../../models/tree-element';
 
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  @Input() data: TreeElement[];
  
  constructor() { 

  }

  ngOnInit() {
  }

  public toggleItem(item: TreeElement): void {
    item.show = !item.show;
  }
}
