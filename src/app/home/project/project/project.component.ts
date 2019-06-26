import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: any[];
  projectModal:boolean = false;
  project: FormGroup;
  selected: any;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

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

  submit() {

  }

  select(project:any) {
    if(this.selected == project){
      this.router.navigate(['home/project/details', project.id]);
    } else {
      this.selected = project;
    }
  }

  edit(){
    this.project.patchValue({
      name: this.selected.name,
      description: this.selected.description
    });
    this.projectModal = true;
  }

  delete(){

  }
}
