import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {RoomI} from "../../../model/room.interface";
import {map, Observable} from "rxjs";
import {MessageI, MessagePaginateI} from "../../../model/message.interface";
import {ChatService} from "../../services/chat-service/chat.service";
import {FormControl, Validators} from "@angular/forms";
import {UserI} from "../../../model/user.interface";

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})

export class ChatRoomComponent implements OnDestroy, OnChanges {

  @Input() chatRoom: RoomI | undefined;

  messages$: Observable<MessagePaginateI> = this.chatService.getMessages().pipe(
    map((messagePaginate: MessagePaginateI) => {
      const items = messagePaginate.items.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at) : null;
        const dateB = b.created_at ? new Date(b.created_at) : null;

        if (dateA && dateB) {
          return dateA.getTime() - dateB.getTime();
        } else if (dateA) {
          return -1;
        } else if (dateB) {
          return 1;
        } else {
          return 0;
        }
      });

      messagePaginate.items = items;
      return messagePaginate;
    })
  );

  chatMessage: FormControl = new FormControl(null, [Validators.required]);

  ngOnDestroy() {
    if(this.chatRoom) {
      this.chatService.joinRoom(this.chatRoom);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.chatRoom) {
      this.chatService.joinRoom(this.chatRoom);
    }
  }

  sendMessage() {
    this.chatService.sendMessage({ text: this.chatMessage.value, room: this.chatRoom });
    this.chatMessage.reset();
  }

  constructor(private chatService: ChatService) {
  }

}
