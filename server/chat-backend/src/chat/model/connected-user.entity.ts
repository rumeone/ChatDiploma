import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/models/user.entity";
import {JoinColumn} from "typeorm/browser";

@Entity()
export class ConnectedUserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    socketId: string;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

}