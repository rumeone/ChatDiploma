import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {ConnectedUserEntity} from "../../model/connected-user/connected-user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ConnectedUserI} from "../../model/connected-user/connected-user.interface";
import {UserI} from "../../../user/models/user.interface";

@Injectable()
export class ConnectedUserService {

    constructor(@InjectRepository(ConnectedUserEntity) private connectedUserRepository: Repository<ConnectedUserEntity>) {
    }

    async create(connectedUser: ConnectedUserI): Promise<ConnectedUserI> {
        return this.connectedUserRepository.save(connectedUser);
    }

    async findByUser(user: UserI): Promise<ConnectedUserI[]> {
        return this.connectedUserRepository.find({
            where: {
                user
            }
        });
    }

    async deleteBySocketId(socketId: string) {
        return this.connectedUserRepository.delete({
            socketId: socketId
        });
    }

    async deleteAll() {
        await this.connectedUserRepository.createQueryBuilder().delete().execute()
    }

}
