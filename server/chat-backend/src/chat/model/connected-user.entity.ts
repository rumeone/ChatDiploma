import {Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import {UserEntity} from "../../user/models/user.entity";

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