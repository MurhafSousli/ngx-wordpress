import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WpAuth, WpAuthRef } from '@ngx-wordpress/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @WpAuth()
  auth: WpAuthRef;
  title = 'Ngx WordPress';
}
