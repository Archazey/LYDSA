import { Component, OnInit } from '@angular/core';

// models
import { TreeElement } from '../shared/models/tree-element';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  treeViewData: TreeElement[];

  constructor() {
    this.treeViewData = [
      {
        title: 'Data structures',
        url: '/#',
        show: false,
        children: [
          {
            title: 'Array-like structures',
            url: '/#',
            show: false,
            children: [
              {
                title: 'Stack',
                url: '/visualize/stack',
                show: false,
                children: []
              },
              {
                title: 'Queue',
                url: '/visualize/queue',
                show: false,
                children: []
              },
              {
                title: 'Deque',
                url: '/visualize/deque',
                show: false,
                children: []
              }
            ]
          },
          {
            title: 'Tree-like structures',
            url: '/#',
            show: false,
            children: [
              {
                title: 'Segment Tree',
                url: '/visualize/segment-tree',
                show: false,
                children: []
              },
              {
                title: 'Binary Indexed Tree',
                url: '/visualize/binary-indexed-tree',
                show: false,
                children: []
              }
            ]
          }
        ]
      },
      {
        title: 'Algorithms',
        url: '/#',
        show: false,
        children: [
          {
            title: 'Sorting',
            url: '/#',
            show: false,
            children: [
              {
                title: 'Bubble sort',
                url: '/visualize/bubble-sort',
                show: false,
                children: []
              },
              {
                title: 'Merge sort',
                url: '/visualize/merge-sort',
                show: false,
                children: []
              },
              {
                title: 'Quick sort',
                url: '/visualize/quick-sort',
                show: false,
                children: []
              }
            ]
          },
          {
            title: 'Path Finding on matrix',
            url: '/#',
            show: false,
            children: [
              {
                title: 'Lee algorithm',
                url: '/visualize/lee',
                show: false,
                children: []
              },
              {
                title: 'A* algorithm',
                url: '/visualize/a-star',
                show: false,
                children: []
              }
            ]
          },
          {
            title: 'Graphs',
            url: '/#',
            show: false,
            children: [
              {
                title: 'Connected components',
                url: '/visualize/connected-components',
                show: false,
                children: []
              },
              {
                title: 'Biconnected components',
                url: '/visualize/biconnected-components',
                show: false,
                children: []
              },
              {
                title: 'Kruskal algorithm',
                url: '/visualize/kruskal',
                show: false,
                children: []
              }
            ]
          }
        ]
      }
    ];
  }

  ngOnInit() {
  }
}
