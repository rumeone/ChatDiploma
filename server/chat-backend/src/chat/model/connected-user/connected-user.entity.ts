import {Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne} from "typeorm";
import {UserEntity} from "../../../user/models/user.entity";

@Entity()
export class ConnectedUserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    socketId: string;

    @OneToOne(() => UserEntity, user => user.connections)
    @JoinColumn()
    user: UserEntity;

}