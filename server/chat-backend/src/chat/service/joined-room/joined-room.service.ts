import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {JoinedRoomEntity} from "../../model/joined-room/joined-room.entity";
import {Repository} from "typeorm";
import {RoomI} from "../../model/room/room.interface";
import {JoinedRoomInterface} from "../../model/joined-room/joined-room.interface";

@Injectable()
export class JoinedRoomService {

    constructor(@InjectRepository(JoinedRoomEntity)
                private readonly joinedRoomRepository: Repository<JoinedRoomEntity>) {
    }

    async create() {

    }

    async findByUser() {

    }

    async findByRoom(room: RoomI): Promise<JoinedRoomInterface[]> {
        return this.joinedRoomRepository.find({
            where : {
                room: room
            }
        })
    }

    async deleteBySocketId(socketId: string) {
        return this.joinedRoomRepository.delete(
            {
                socketId: socketId
            }
        )
    }

    async deleteAll() {
        await this.joinedRoomRepository.createQueryBuilder().delete().execute();
    }

}
