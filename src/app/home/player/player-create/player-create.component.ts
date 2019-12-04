import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { DepartmentService } from '../../shared/services/department.service';
import { TeamService } from '../../shared/services/team.service';
import { FunctionService } from '../../shared/services/function.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css']
})
export class PlayerCreateComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    departmentId: ['', Validators.required],
    functionId: ['', Validators.required],
    teamId: ['', Validators.required],
    birthdate: ['', Validators.required],
    city: ['', Validators.required],
    cellphone: ['', Validators.required],
    landline: ['', Validators.required],
    documentNumber: ['', Validators.required],
    zipcode: ['', Validators.required]
  })
  departments: any;
  teams: any;
  functions: any;
  departmentStatus: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private teamService: TeamService,
    private functionService: FunctionService,
  ) { }

  ngOnInit() {
    this.getDepartment();
    this.getTeam();
  }

  onSubmit() {
    return true;
  }

  getDepartment() {
    this.departmentService.findAllDepartments().subscribe(
      (response) => {
        this.departments = response.object;
      }, (err) => {
        console.log('deu ruim department');
      }
    )
  }

  getFunction(id) {
    this.departmentStatus = false;
    this.functionService.findFunctionByDepartment(id).subscribe(
      (response) => {
        this.departmentStatus = true;
        this.functions = response.object;
      }, (err) => {
        console.log('deu ruim department');
      }
    )
  }

  getTeam() {
    this.teamService.findAllTeam().subscribe(
      (response) => {
        console.log(response);
        this.teams = response.object;
      }, (err) => {
        console.log('deu ruim team');
      }
    )
  }



}
