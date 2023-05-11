import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserController } from './controller/user.controller';
import { UserService } from './service/user-service/user.service';
import {UserEntity} from "./models/user.entity";
import {UserHelperService} from "./service/user-helper/user-helper.service";

@Module({
  imports: [TypeOrmModule.forFeature([
      UserEntity
  ])],
  controllers: [UserController],
  providers: [UserService, UserHelperService]
})
export class UserModule {}