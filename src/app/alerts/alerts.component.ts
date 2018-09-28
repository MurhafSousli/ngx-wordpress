import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WpAuth, WpError, WpAuthState } from '@ngx-wordpress/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsComponent {
  @WpAuth() auth: WpAuthState;
  @WpError() error: Observable<Error>;
}
