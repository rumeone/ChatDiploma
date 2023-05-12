import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../models/user.entity";
import {Repository} from "typeorm";
import {UserI} from "../../models/user.interface";
import {from, map, mapTo, Observable, switchMap} from "rxjs";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {AuthService} from "../../../auth/service/auth.service";

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private authService: AuthService) {
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

    login(user: UserI): Observable<string> {
        return this.findByEmail(user.email).pipe(
            switchMap((foundUser: UserI) => {
                if (foundUser) {
                    return this.validatePassword(user.password, foundUser.password).pipe(
                        switchMap((matches: boolean) => {
                            if (matches) {
                                return this.findOne(foundUser.id).pipe(
                                    switchMap((payload: UserI) => this.authService.generateJwt(payload))
                                )
                            } else {
                                throw new HttpException('Login was not successfull, worng credenitals', HttpStatus.UNAUTHORIZED);
                            }
                        })
                    );
                } else {
                    throw new HttpException('User not found', HttpStatus.NOT_FOUND)
                }
            })
        );
    }

    findAll(options: IPaginationOptions): Observable<Pagination<UserI>> {
        return from(paginate<UserEntity>(this.userRepository, options));
    }

    private findByEmail(email: string): Observable<UserI> {
        return from(this.userRepository.findOne({where: {email}, select: ['id', 'email', 'username', 'password']}));
    }

    private findOne(id: number): Observable<UserI> {
        return from(this.userRepository.findOne({where: {id}}));
    }

    public getOne(id: number): Promise<UserI> {
        return this.userRepository.findOneOrFail({where: {id}});
    }

    private hashPassword(password: string): Observable<string> {
        return this.authService.hashPassword(password);
    }

    private validatePassword(password: string, storedPasswordHash: string): Observable<any> {
        return this.authService.comparePassword(password, storedPasswordHash);
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
