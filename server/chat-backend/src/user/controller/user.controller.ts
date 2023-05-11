import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "../service/user-service/user.service";
import {Observable, of, switchMap} from 'rxjs'
import {CreateUserDto} from "../models/dto/create-user.dto";
import {UserHelperService} from "../service/user-helper/user-helper.service";
import {UserI} from "../models/user.interface";

@Controller('users')
export class UserController {

    constructor(private userService: UserService, private userHelperService: UserHelperService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Observable<UserI> {
        return this.userHelperService.createUserDtoToEntity(createUserDto).pipe(
            switchMap((user: UserI) => this.userService.create(user))
        )
    }

    @Get()
    findAll() {

    }

    @Post()
    login() {

    }

}
