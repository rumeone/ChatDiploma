import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../user/user.module";
import { RoomService } from './service/room-service/room.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/models/user.entity";
import {RoomEntity} from "./model/room.entity";
import { ConnectedUserService } from './service/connected-user/connected-user.service';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forFeature([
      UserEntity, RoomEntity
  ])],
  providers: [ChatGateway, RoomService, ConnectedUserService]
})
export class ChatModule {}
