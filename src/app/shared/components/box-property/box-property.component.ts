import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import * as $ from 'jquery';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-box-property',
  templateUrl: './box-property.component.html',
  styleUrls: ['./box-property.component.css']
})
export class BoxPropertyComponent implements OnInit {
  
  @Input() type: string;
  @Input() title: string;
  @Input() number: string;
  @Input() description: string;
  @Input() topics: any;

  mainStyle = this.profileService.getAppSecondaryColor();

  topicsParsed: any;

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
  }

}
