import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {RoomI} from "../../../model/room.interface";
import {Observable} from "rxjs";
import {MessagePaginateI} from "../../../model/message.interface";
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

  messages$: Observable<MessagePaginateI> = this.chatService.getMessage();
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
