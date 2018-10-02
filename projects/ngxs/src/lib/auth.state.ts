import { State, Action } from '@ngxs/store';
import { WpAuthState, defaultAuthState } from '@ngx-wordpress/core';

export class SignIn {
  static readonly type = '[WP_AUTH] Sign in';
}

export class SignOut {
  static readonly type = '[WP_AUTH] Sign out';
}

export class ValidateToken {
  static readonly type = '[WP_AUTH] Validate Token';
}

@State<WpAuthState>({
  name: 'wp',
  defaults: defaultAuthState
})
export class WordPressState {
  @Action(SignIn)
  get({getState, setState}) {
    const state = getState();
    setState(state + 1);
  }

  @Action(SignOut)
  more({getState, setState}) {
    const state = getState();
    setState(state + 1);
  }

  @Action(ValidateToken)
  next({getState, setState}) {
    const state = getState();
    setState(state + 1);
  }
}
