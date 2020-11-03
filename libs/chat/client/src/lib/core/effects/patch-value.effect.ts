import { Action } from '../actions';
import { Observable, asyncScheduler } from 'rxjs';
import { observeOn, filter, tap } from 'rxjs/operators';
import { ActionTypes } from '@nx-feat/chat-data';
import { Socket } from 'ngx-socket-io';

export const getPatchValueEffect = (
  socket: Socket,
  actions: Observable<Action>
) => {
  // const webSocket = new WebSocket('ws:localhost:3333')
  // webSocket.send()
  return actions.pipe(
    observeOn(asyncScheduler),
    filter((action) => action.type === ActionTypes.PatchValue),
    tap((action) => socket.emit(ActionTypes.PatchValue, action.payload))
  );
};
