import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../_helpers/custom-validators";
import {UserService} from "../../service/user-service/user.service";
import {Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required])
    },
    {
      validators: CustomValidators.passwordsMatching
    })

  constructor(private userService: UserService, private route: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    if (this.form.valid) {
      this.userService.create({
        email: this.email.value,
        password: this.password.value,
        username: this.username.value
      }).pipe(
        tap(() => this.route.navigate(['../login']))
      ).subscribe((value) => console.log(value));
    }
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
  }


}
