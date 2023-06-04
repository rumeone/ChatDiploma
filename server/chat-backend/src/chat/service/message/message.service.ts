import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MessageEntity} from "../../model/message/message.entity";
import {Repository} from "typeorm";
import {MessageI} from "../../model/message/message.interface";
import {RoomI} from "../../model/room/room.interface";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class MessageService {

    constructor(@InjectRepository(MessageEntity)
                private readonly messageRepository: Repository<MessageEntity>) {
    }

    async create(message: MessageI): Promise<MessageI> {
        return this.messageRepository.save(this.messageRepository.create(message))
    }

    async findMessageForRoom(room: RoomI, options: IPaginationOptions): Promise<Pagination<MessageI>> {
        return paginate(this.messageRepository, options, {
            room,
            relations: ['user', 'room']
        })
    }

}
