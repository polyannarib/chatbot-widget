import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-find',
  templateUrl: './resource-find.component.html',
  styleUrls: ['./resource-find.component.css']
})
export class ResourceFindComponent implements OnInit {

  arrows: boolean = true;
  slick = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
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
