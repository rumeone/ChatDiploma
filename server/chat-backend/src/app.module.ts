import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppService} from "./app.service";
import {AppController} from "./app.controller";
import {UserModule} from './user/user.module';
import {UserHelperService} from './user/service/user-helper/user-helper.service';
import {AuthModule} from './auth/auth.module';
import {AuthMiddleware} from "./middleware/auth-middleware";
import {UserController} from "./user/controller/user.controller";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                autoLoadEntities: true
            }),
        }),
        AppModule,
        UserModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService, UserHelperService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: 'api', method: RequestMethod.GET },
                { path: 'api', method: RequestMethod.POST },
                'api/(.*)',
            )
            .forRoutes(UserController);
    }
}
