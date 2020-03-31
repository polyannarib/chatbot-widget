import { Directive, HostBinding } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';

@Directive({
  selector: '[appMainColor]'
})
export class MainColorDirective {

  @HostBinding('style.backgroundColor') background: string;

  constructor(
    private profileService: ProfileService
  ) { }

  getProfileColor() {
    this.profileService.getWhiteLabel().subscribe(
      (response) => {
        
      })
  }

}
