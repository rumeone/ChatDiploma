import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import {UserController} from './controller/user.controller';
import {UserService} from './service/user-service/user.service';
import {UserEntity} from "./models/user.entity";
import {UserHelperService} from "./service/user-helper/user-helper.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([
        UserEntity
    ]), AuthModule],
    controllers: [UserController],
    providers: [UserService, UserHelperService]
})
export class UserModule {
}
