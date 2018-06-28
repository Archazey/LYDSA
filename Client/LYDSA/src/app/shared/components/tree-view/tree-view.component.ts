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
  itemStars: boolean[][] = [];
  numberOfStars: number = 5;
  avgRating: number[] = [];

  constructor() {
  }

  ngOnInit() {
    for (var item of this.data) {
      var starArray = new Array(this.numberOfStars);
      var stars = this.getRandomInt(0, this.numberOfStars);
      for (var i = 0; i < this.numberOfStars; i++) {
        starArray[i] = false;
        if (i < stars)
          starArray[i] = true;  
      }
      starArray.reverse();
      this.itemStars.push(starArray);
      this.avgRating.push(this.getRandom(1, this.numberOfStars).toFixed(2));
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  public toggleItem(item: TreeElement): void {
    item.show = !item.show;
  }

  userIsLoggedIn(): boolean {
    if (window.sessionStorage['lydsa-username']) 
      return true;
    return false;
  }
}
