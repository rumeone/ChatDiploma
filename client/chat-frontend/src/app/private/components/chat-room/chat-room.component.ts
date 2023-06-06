import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { MessagePaginateI } from 'src/app/model/message.interface';
import { RoomI } from 'src/app/model/room.interface';
import { ChatService } from '../../services/chat-service/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnChanges, OnDestroy, AfterViewInit {

  @Input() chatRoom: RoomI | undefined;
  @ViewChild('messages') private messagesScroller: ElementRef | undefined;

  messagesPaginate$: Observable<MessagePaginateI> = combineLatest([
    this.chatService.getMessages(),
    this.chatService.getAddedMessage().pipe(startWith(null))
  ]).pipe(
    map(([messagePaginate, message]) => {
      if (message && message.room?.id === this.chatRoom?.id && !messagePaginate.items.some(m => m.id === message.id)) {
        messagePaginate.items.push(message);
      }
      const items = messagePaginate.items.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at) : null;
        const dateB = b.created_at ? new Date(b.created_at) : null;
        return dateA && dateB ? dateA.getTime() - dateB.getTime() : 0;
      });
      messagePaginate.items = items;
      return messagePaginate;
    }),
    tap(() => this.scrollToBottom())
  );


  chatMessage: FormControl = new FormControl(null, [Validators.required]);

  constructor(private chatService: ChatService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.chatService.leaveRoom(changes['chatRoom'].previousValue);
    if (this.chatRoom) {
      this.chatService.joinRoom(this.chatRoom);
    }
  }

  ngAfterViewInit() {
    if (this.messagesScroller) {
      this.scrollToBottom();
    }
  }

  ngOnDestroy() {
    if(this.chatRoom) {
      this.chatService.joinRoom(this.chatRoom);
    }
  }
  sendMessage() {
    this.chatService.sendMessage({ text: this.chatMessage.value, room: this.chatRoom });
    this.chatMessage.reset();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesScroller) {
        this.messagesScroller.nativeElement.scrollTop = this.messagesScroller.nativeElement.scrollHeight;
      }
    }, 1);
  }


}
