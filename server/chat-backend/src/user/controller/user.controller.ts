import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "../service/user-service/user.service";
import {Observable, of} from 'rxjs'
import {CreateUserDto} from "../models/dto/create-user.dto";

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Observable<boolean> {
        return of(true);
    }

    @Get()
    findAll() {

    }

    @Post()
    login() {

    }

}
