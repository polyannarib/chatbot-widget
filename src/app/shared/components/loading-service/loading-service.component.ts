import { Component } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading-service',
  templateUrl: './loading-service.component.html',
  styleUrls: ['./loading-service.component.scss']
})
export class LoadingServiceComponent {

  constructor(
    public loadingService: LoadingService
  ) { }
}
