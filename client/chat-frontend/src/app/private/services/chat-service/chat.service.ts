import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { RoomI, RoomPaginateI } from 'src/app/model/room.interface';
import { CustomSocket } from '../../sockets/custom-socket';
import {MessageI, MessagePaginateI} from "../../../model/message.interface";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: CustomSocket, private snackbar: MatSnackBar) { }

  sendMessage(message: MessageI) {
    this.socket.emit('addMessage', message);
  }

  joinRoom(room: RoomI) {
    this.socket.emit('joinRoom', room);
  }

  leaveRoom(room: RoomI) {
    this.socket.emit('leaveRoom', room);
  }

  getMessage(): Observable<MessagePaginateI> {
    return this.socket.fromEvent<MessagePaginateI>('message');
  }

  getMyRooms(): Observable<RoomPaginateI> {
    return this.socket.fromEvent<RoomPaginateI>('rooms');
  }

  emitPaginateRooms(limit: number, page: number) {
    this.socket.emit('paginateRooms', {limit, page});
  }

  createRoom(room: RoomI) {
    this.socket.emit('createRoom', room);
    this.snackbar.open(`Room ${room.name} created successfully`, 'Close', {
      duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    });
  }

}
