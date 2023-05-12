import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {UserService} from "../service/user-service/user.service";
import {map, Observable, of, switchMap} from 'rxjs'
import {CreateUserDto} from "../models/dto/create-user.dto";
import {UserHelperService} from "../service/user-helper/user-helper.service";
import {UserI} from "../models/user.interface";
import {Pagination} from "nestjs-typeorm-paginate";
import {LoginUserDto} from "../models/dto/login-user.dto";
import {LoginResponseI} from "../models/login-response.interface";
import {JwtAuthGuard} from "../../auth/guards/jwt.guard";

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

    //@UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Query('page') page: number = 1,
            @Query('limit') limit: number = 10): Observable<Pagination<UserI>> {

        limit = limit > 100 ? 100 : limit;
        return this.userService.findAll({page, limit, route: 'http://localhost:3000/api/users'});
            
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto): Observable<LoginResponseI> {
        return this.userHelperService.loginUserDtoToEntity(loginUserDto).pipe(
            switchMap((user: UserI) => this.userService.login(user).pipe(
                map((jwt: string) => {
                    return {
                        access_token: jwt,
                        token_type: 'JWT',
                        expires_in: 10000
                    }
                })
            ))
        );
    }

}
