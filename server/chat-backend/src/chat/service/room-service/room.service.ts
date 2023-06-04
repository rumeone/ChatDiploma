import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RoomEntity} from "../../model/room/room.entity";
import {Repository} from "typeorm";
import {RoomI} from "../../model/room/room.interface";
import {UserI} from "../../../user/models/user.interface";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class RoomService {

    constructor(@InjectRepository(RoomEntity) private readonly roomRepository: Repository<RoomEntity>) {
    }

    async createRoom(room: RoomI, creator: UserI): Promise<RoomI> {
        const newRoom = await this.addCreatorToRoom(room, creator);
        console.log(newRoom);
        return this.roomRepository.save(newRoom);
    }

    async getRoomsForUser(userId: number, options: IPaginationOptions): Promise<Pagination<RoomI>> {
        const query = this.roomRepository
            .createQueryBuilder('room')
            .leftJoin('room.users', 'users')
            .where('users.id = :userId', {userId})
            .leftJoinAndSelect('room.users', 'all_users')
            .orderBy('room.updated_at', 'DESC')

        return paginate(query, options);
    }

    async getRoom(roomId: number): Promise<RoomI> {
        return this.roomRepository.findOne({
            where: {
                id: roomId
            },
            relations: ['users']
        });
    }

    async addCreatorToRoom(room: RoomI, creator: UserI): Promise<RoomI> {
        room.users.push(creator);
        return room;
    }
}