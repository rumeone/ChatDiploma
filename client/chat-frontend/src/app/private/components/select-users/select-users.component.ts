import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserI} from "../../../model/user.interface";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";
import {UserService} from "../../../public/service/user-service/user.service";

@Component({
  selector: 'app-select-users',
  templateUrl: './select-users.component.html',
  styleUrls: ['./select-users.component.css']
})
export class SelectUsersComponent implements OnInit {

  @Input() users: UserI[] = [];
  @Output() addUser: EventEmitter<UserI> = new EventEmitter<UserI>();
  @Output() removeUser: EventEmitter<UserI> = new EventEmitter<UserI>();

  searchUsername = new FormControl();
  filteredUsers: UserI[] = [];
  selectedUser: UserI | null = null;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.searchUsername.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((username: string) => this.userService.fundByUsername(username).pipe(
        tap((users: UserI[]) => this.filteredUsers = users)
      ))
    ).subscribe();
  }

  addUserToForm() {
    if (this.selectedUser !== null) {
      this.addUser.emit(this.selectedUser);
    }
    this.selectedUser = null;
    this.filteredUsers = [];
    this.searchUsername.setValue(null);
  }

  displayFn(user: UserI): string {
    if (user) {
      return <string>user.username;
    } else {
      return '';
    }
  }

  setSelectedUser(user: UserI) {
    this.selectedUser = user;
  }

}
