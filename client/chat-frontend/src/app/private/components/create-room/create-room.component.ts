import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserI} from "../../../model/user.interface";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    users: new FormArray([], [Validators.required])
  });

  constructor() {
  }

  create() {

  }

  initUser(user: UserI) {
    return new FormControl({
      id: user.id,
      name: user.username,
      email: user.email
    })
  }

  addUser(userFormControl: FormControl) {
    this.users.push(userFormControl)
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get users(): FormArray {
    return this.form.get('users') as FormArray
  }

}
