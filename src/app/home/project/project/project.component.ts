import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: any[];
  projectModal:boolean = false;
  project: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.project = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.projects = [
      {
        id: 9098080808,
        name: "Workplayer",
        description: "Sistema de gamefication da Kyros",

      },
      {
        id: 9098080808,
        name: "Outro Projeto",
        description: "Sistema qualquer",

      },
      {
        id: 909234808,
        name: "Ótimo Projeto",
        description: "Um ótimo projeto",

      }
    ]
  }

}
