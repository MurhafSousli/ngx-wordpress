import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { WpAuth, WpAuthRef } from '@ngx-wordpress/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {
  @WpAuth()
  auth: WpAuthRef;

  username = 'admin';
  password = 'maxis2005';

  validateLoading: ClrLoadingState = ClrLoadingState.DEFAULT;
  signInLoading: ClrLoadingState = ClrLoadingState.DEFAULT;

  signIn() {
    this.signInLoading = ClrLoadingState.LOADING;
    this.auth.signIn(this.username, this.password).subscribe(res => {
      this.signInLoading = res.error
        ? ClrLoadingState.ERROR
        : ClrLoadingState.SUCCESS;
    });
  }

  validate() {
    this.validateLoading = ClrLoadingState.LOADING;
    this.auth.validateToken().subscribe(res => {
      this.validateLoading = res.error
        ? ClrLoadingState.ERROR
        : ClrLoadingState.SUCCESS;
    });
  }

  signOut() {
    this.auth.signOut().subscribe();
  }
}
