import { filter, observeOn, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { asyncScheduler, Observable } from 'rxjs';
import { AuthAction } from './auth-actions';
import { AuthTypes } from '@nx-feat/chat-data';
export class AuthEffects {
  static login(
    form: FormGroup,
    actions: Observable<AuthAction>
  ) {
    return actions.pipe(
      observeOn(asyncScheduler),
      filter(action => action.type === AuthTypes.Login)
    )
  }
}
