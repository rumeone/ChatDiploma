import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { UserI } from 'src/app/model/user.interface';
import { UserService } from 'src/app/public/service/user-service/user.service';


@Component({
  selector: 'app-select-users',
  templateUrl: './select-users.component.html',
  styleUrls: ['./select-users.component.scss']
})
export class SelectUsersComponent implements OnInit {

  @Input() users: UserI[] = [];
  @Output() addUser: EventEmitter<UserI> = new EventEmitter<UserI>();
  @Output() removeuser: EventEmitter<UserI>= new EventEmitter<UserI>();

  searchUsername = new FormControl();
  filteredUsers: UserI[] = [];
  selectedUser: UserI | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.searchUsername.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((username: string) => this.userService.findByUsername(username).pipe(
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

  removeUserFromForm(user: UserI) {
    this.removeuser.emit(user);
  }

  setSelectedUser(user: UserI) {
    this.selectedUser = user;
  }

  displayFn(user: UserI): string {
    if (user) {
      return <string>user.username;
    } else {
      return '';
    }
  }

}

/*  addUserToForm() {
    if (this.selectedUser !== null) {
      this.addUser.emit(this.selectedUser);
    }
    this.selectedUser = null;
    this.filteredUsers = [];
    this.searchUsername.setValue(null);
  }*/

/*  displayFn(user: UserI): string {
    if (user) {
      return <string>user.username;
    } else {
      return '';
    }
  }*/
