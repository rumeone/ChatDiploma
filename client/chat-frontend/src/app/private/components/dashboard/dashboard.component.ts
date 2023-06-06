import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ChatService } from '../../services/chat-service/chat.service';
import {MatSelectionListChange} from "@angular/material/list";
import {PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";
import {RoomPaginateI} from "../../../model/room.interface";
import {UserI} from "../../../model/user.interface";
import {AuthService} from "../../../public/service/auth-service/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  rooms$: Observable<RoomPaginateI>= this.chatService.getMyRooms();
  selectedRoom = null;
  user: UserI = this.authService.getLoggedInUser();


  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.rooms$.subscribe(rooms => {
      console.log(rooms);
    });

    this.chatService.emitPaginateRooms(10, 0);
  }

  onSelectRoom(event: MatSelectionListChange) {
    console.log(this.rooms$)
    this.selectedRoom = event.source.selectedOptions.selected[0].value;
  }

  onPaginateRooms(pageEvent: PageEvent) {
    this.chatService.emitPaginateRooms(pageEvent.pageSize, pageEvent.pageIndex)
  }

}
