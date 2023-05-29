import {Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToMany} from "typeorm";
import {UserEntity} from "../../user/models/user.entity";

@Entity()
export class ConnectedUserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    socketId: string;

    @OneToMany(() => UserEntity, user => user.connections)
    @JoinColumn()
    user: UserEntity;

}