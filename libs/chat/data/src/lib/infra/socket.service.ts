import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  sendMessage(message: Message) {
    this.socket.emit('add-message', message);
  }

  markNotificationAsSeen(room, userId: string) {
    this.socket.emit('notifications-seen', { root: room, userId });
  }

  createRoom(roomName: String, creatorId: String, users: any[]) {
    this.socket.emit('create-chatroom', {
      roomName,
      creatorId,
      users,
    });
  }

  createPrivateRoom(userId: String, withUser: string) {
    this.socket.emit('create-private-room', {
      userId,
      withUser,
    });
  }

  joinRoom(room) {
    this.socket.emit('join-room', { room });
  }

  addPersonsToRoom(data) {
    this.socket.emit('add-person', data);
  }

  privateRoomSelected() {
    const observable = new Observable((observer) => {
      this.socket.on('create-private-room-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  leaveChatRoom(roomId: String, userId: String): any {
    this.socket.emit('leave-chatroom', {
      roomId,
      userId,
    });

    const observable = new Observable((observer) => {
      this.socket.on('leave-chatroom-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getRoomList(userId: String): any {
    this.socket.emit('room-list', { userId: userId });

    const observable = new Observable((observer) => {
      this.socket.on('room-list-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  receiveMessages(): any {
    const observable = new Observable((observer) => {
      this.socket.on('add-message-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getNotifcations(userId): any {
    this.socket.emit('notifications', { userId: userId });

    const observable = new Observable((observer) => {
      this.socket.on('notifications-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  /*
   * Method to receive chat-list-response event.
   */
  getChatList(userId: string): any {
    this.socket.emit('chat-list', { userId: userId });

    const observable = new Observable((observer) => {
      this.socket.on('chat-list-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // Call Logic

  call(userId: String, roomId: String) {
    this.socket.emit('call', { userId: userId, roomId: roomId });
  }

  onReceiveCall(): any {
    const observable = new Observable((observer) => {
      this.socket.on('receiving-call', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  onRoomCall(): any {
    const observable = new Observable((observer) => {
      this.socket.on('room-call', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  onCallLeave(): any {
    const observable = new Observable((observer) => {
      this.socket.on('user-call-leave', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  answerCall(userId, roomId) {
    this.socket.emit('call-answer', {
      answer: true,
      userId: userId,
      roomId: roomId,
    });
  }

  rejectCall() {
    this.socket.emit('call-answer', { answer: false });
  }
  userConected() {
    const observable = new Observable((observer) => {
      this.socket.on('user-connected', (data) => {
        observer.next(data);
      });
    });

    return observable;
  }

  userDisconected() {
    const observable = new Observable((observer) => {
      this.socket.on('user-disconnected', (data) => {
        observer.next(data);
      });
    });

    return observable;
  }

  singOut() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
