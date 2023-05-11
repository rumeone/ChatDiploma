import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../models/user.entity";
import {FindOneOptions, FindOptionsWhere, Repository} from "typeorm";
import {UserI} from "../../models/user.interface";
import {from, map, Observable, switchMap} from "rxjs";

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    create(newUser: UserI): Observable<UserI> {
        return this.mailExists(newUser.email).pipe(
            switchMap((exists: boolean) => {
                if (!exists) {
                    return this.hashPassword(newUser.password).pipe(
                        switchMap((passwordHash: string) => {
                            newUser.password = passwordHash;
                            return from(this.userRepository.save(newUser)).pipe(
                                switchMap((user: UserI) => this.findOne(user.id))
                            );
                        })
                    );
                } else {
                    throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
                }
            })
        );
    }

    private findOne(id: number): Observable<UserI> {
        return from(this.userRepository.findOne({where: {id}}));
    }

    private hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12))
    }

    private mailExists(email: string): Observable<boolean> {
        return from(this.userRepository.findOne({where: {email}})).pipe(
            map((user: UserI) => {
                if (user) {
                    return true;
                } else {
                    return false;
                }
            })
        );
    }
}
