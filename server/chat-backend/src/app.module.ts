import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import {AppService} from "./app.service";
import {AppController} from "./app.controller";
import { UserModule } from './user/user.module';
import { UserHelperService } from './user/service/user-helper/user-helper.service';

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
        synchronize: true, // Установите в false в продакшн окружении
        autoLoadEntities: true
      }),
    }),
      AppModule,
      UserModule
  ],
  controllers: [AppController],
  providers: [AppService, UserHelperService],
})
export class AppModule {}
