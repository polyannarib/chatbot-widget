import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { TaskService } from 'src/app/core/services/task.service';
import { format } from 'date-fns';
import { FinalizeComponent } from '../../../../shared/components/modal/finalize/finalize.component';
import { RemoveComponent } from '../../../../shared/components/modal/remove/remove.component';
import { PlayerService } from '../../../../core/services/player.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProjectDetailsComponent implements OnInit {

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null;

  loader: boolean = false;
  projectTasks: any;
  designate: boolean = false;
  taskHeader = ['PROJECT', 'ACTIVITY', 'DUEDATE', 'EFFORT'];
  taskList: any;

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.findProjectTasks();
  }

  findProjectTasks() {
    this.loader = true;
    this.taskService.findProjectTasks(this.data.project.id, format(this.data.projectDate, 'dd-MM-yyyy')).subscribe(
      (response) => {
        // this.dataSource = response.object;
        this.taskList = response.object.tasks
        this.projectTasks = response.object;
        this.loader = false;
      }, (err) => {
        this.loader = false;
      }
    )
  }

  reciverDesignate(value) {
    this.designate = value;
  }
 
  // finalize(activityId) {
  //   const dataSend = {
  //     activityId: activityId
  //   }
  //   const dialogRef = this.dialog.open(FinalizeComponent, {
  //     width: '500px',
  //     data: dataSend
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('result ------- finalize component --------');
  //     console.log(result);
  //   });
  // }

  // remove(activityId): void {
  //   const dataSend = {
  //     activityId: activityId
  //   }
  //   const dialogRef = this.dialog.open(RemoveComponent, {
  //     width: '500px',
  //     data: dataSend
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('result ------- remove component --------');
  //     console.log(result);
  //   });
  // }
  
  // suspend(activityId): void {
  //   const dataSend = {
  //     activityId: activityId
  //   }
  //   const dialogRef = this.dialog.open(ProjectDetailsComponent, {
  //     width: '90vw',
  //     data: dataSend
  //   });
  // }

  // findDesignatePlayers(taskId) {
  //   if (!this.openPlayerRated) {
  //     this.openPlayerRated = true;
  //     this.loaderPlayerRated = true;
  //     this.playerService.findDesignatePlayers(taskId).subscribe(
  //       (response) => {
  //         console.log('-------- playerService -------');
  //         console.log(response);
  //         this.playerRate = response.object.rated;
  //         this.playerAllocated = response.object.allocated;
  //         this.loaderPlayerRated = false;
  //         // this.openPlayerRated = false;
  //       }, (err) => {
  //         this.loaderPlayerRated = false;
  //         console.log('------ err ------');
  //         console.log(err);
  //       }
  //     )
  //   } else { 
  //     this.openPlayerRated = false;
  //   }
  // }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];
