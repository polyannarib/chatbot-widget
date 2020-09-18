import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatListOption, MatSelectionList, MatSnackBar } from '@angular/material';
import { ProfileService } from 'src/app/core/services/profile.service';
import { TaskService } from 'src/app/core/services/task.service';
import { NotifyComponent } from 'src/app/shared/components/notify/notify.component';

@Component({
  selector: 'app-designate-player',
  templateUrl: './designate-player.component.html',
  styleUrls: ['./designate-player.component.css']
})
export class DesignatePlayerComponent implements OnInit {
  @ViewChild(MatSelectionList, {static: true}) private selectionList: MatSelectionList;
  playersList = [];
  playerToDesignate;
  mainStyle = this.profileService.getAppMainColor();

  constructor(
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private profileService: ProfileService,
    private dialogRef: MatDialogRef<DesignatePlayerComponent>
  ) { }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  checkEnter(key) {
    if (key === 13) {
      this.searchPlayerToDesignate();
    }
  }

  searchPlayerToDesignate() {
    this.taskService.getPlayersToDesignate(this.playerToDesignate).subscribe(
      (response) => {
        if (response.status === 0) {
          this.playersList = response.object;
        } else {
          this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Nenhum player encontrado.' } });
        }
      }, (error) => {
        this._snackBar.openFromComponent(NotifyComponent, { data: { type: 'error', message: 'Não foi possível encontrar o player!' } });
      }
    );
  }

  designatePlayer(player) {
    this.dialogRef.close(player);
  }
}
