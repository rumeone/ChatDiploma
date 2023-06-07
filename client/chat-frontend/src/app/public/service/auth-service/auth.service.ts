import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserI} from "../../../model/user.interface";
import {catchError, Observable, tap} from "rxjs";
import {LoginResponseI} from "../../../model/login-response.interface";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private jwtService: JwtHelperService) { }

  login(user: UserI): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>('api/users/login', user).pipe(
      tap((res: LoginResponseI) => {
        localStorage.setItem('nestjs_chat_app', res.access_token);
        this.snackbar.open('Login was successful', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }),
        catchError((error) => {
          this.snackbar.open(error.error.message, 'Close', {
            duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
          });
          throw error;
        })
    );
  }


  getLoggedInUser() {
    const decodedToken = this.jwtService.decodeToken();
    console.log(`Token are ${decodedToken}`);
    return decodedToken.user;
  }

}
