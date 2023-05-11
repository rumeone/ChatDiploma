import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "../../models/dto/create-user.dto";
import {Observable, of} from "rxjs";
import {UserI} from "../../models/user.interface";
import {LoginUserDto} from "../../models/dto/login-user.dto";

@Injectable()
export class UserHelperService {
    createUserDtoToEntity(createUserDto: CreateUserDto): Observable<UserI> {
        return of({
            email: createUserDto.email,
            username: createUserDto.username,
            password: createUserDto.password
        });
    }

    loginUserDtoToEntity(loginUserDto: LoginUserDto): Observable<UserI> {
        return of({
            email: loginUserDto.email,
            password: loginUserDto.password
        })
    }
}
