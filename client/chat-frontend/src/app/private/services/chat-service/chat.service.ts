import { Injectable } from '@angular/core';
import { RoomI, RoomPaginatedI } from 'src/app/model/room.interface';
import { UserI } from 'src/app/model/user.interface';
import { CustomSocket } from '../../sockets/custom-socket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: CustomSocket) { }

  sendMessage() {
  }

  getMessage() {
    return this.socket.fromEvent('message');
  }

  getMyRooms() {
    return this.socket.fromEvent<RoomPaginatedI>('rooms');
  }

  emitPaginateRooms(limit: number, page: number) {
    this.socket.emit('paginateRooms', {limit, page})
  }

  createRoom() {

    /*this.socket.emit('createRoom', room);*/
  }

}
