import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-find',
  templateUrl: './resource-find.component.html',
  styleUrls: ['./resource-find.component.css']
})
export class ResourceFindComponent implements OnInit {

  displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data = [
    { img: 'https://asdasdasdasd', resource: 'Bruna', department: 'TI', team: 'Anderson', project: 'workplayer'},
    { img: 'https://asdasdasdasd', resource: 'Bruna', department: 'TI', team: 'Anderson', project: 'workplayer'},
    { img: 'https://asdasdasdasd', resource: 'Bruna', department: 'TI', team: 'Anderson', project: 'workplayer'},
    { img: 'https://asdasdasdasd', resource: 'Bruna', department: 'TI', team: 'Anderson', project: 'workplayer'},
    { img: 'https://asdasdasdasd', resource: 'Bruna', department: 'TI', team: 'Anderson', project: 'workplayer'},
    { img: 'https://asdasdasdasd', resource: 'Bruna', department: 'TI', team: 'Anderson', project: 'workplayer'},
    { img: 'https://asdasdasdasd', resource: 'Bruna', department: 'TI', team: 'Anderson', project: 'workplayer'},
    { img: 'https://asdasdasdasd', resource: 'Bruna', department: 'TI', team: 'Anderson', project: 'workplayer'},
    { img: 'https://asdasdasdasd', resource: 'Bruna', department: 'TI', team: 'Anderson', project: 'workplayer'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
