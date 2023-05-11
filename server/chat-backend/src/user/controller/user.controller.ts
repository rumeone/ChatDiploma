import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "../service/user.service";
import {UserI} from "../models/user.interface";
import {Observable} from 'rxjs'

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: ): Observable<UserI> {
        
    }

}
