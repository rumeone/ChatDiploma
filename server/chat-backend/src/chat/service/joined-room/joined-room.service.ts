import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {JoinedRoomEntity} from "../../model/joined-room/joined-room.entity";
import {Repository} from "typeorm";
import {RoomI} from "../../model/room/room.interface";
import {JoinedRoomI} from "../../model/joined-room/joined-room.interface";
import {UserI} from "../../../user/models/user.interface";

@Injectable()
export class JoinedRoomService {

    constructor(@InjectRepository(JoinedRoomEntity)
                private readonly joinedRoomRepository: Repository<JoinedRoomEntity>) {
    }

    async create(joinedRoomUser: JoinedRoomI): Promise<JoinedRoomI> {
        return this.joinedRoomRepository.save(joinedRoomUser);
    }

    async findByUser(user: UserI): Promise<JoinedRoomI[]> {
        return this.joinedRoomRepository.find({
            where: {
                user: user
            }
        })
    }

    async findByRoom(room: RoomI): Promise<JoinedRoomI[]> {
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
