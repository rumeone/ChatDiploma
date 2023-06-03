import { RoomEntity } from "src/chat/model/room/room.entity";
import {BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ConnectedUserEntity} from "../../chat/model/connected-user/connected-user.entity";
import {JoinedRoomEntity} from "../../chat/model/joined-room/joined-room.entity";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @ManyToMany(() => RoomEntity, room => room.users)
    rooms: RoomEntity[]

    @OneToMany(() => ConnectedUserEntity, connection => connection.user)
    connections: ConnectedUserEntity[];

    @OneToMany(() => UserEntity, user => user.joinedRooms)
    joinedRooms: JoinedRoomEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
        this.username = this.username.toLowerCase();
    }

}