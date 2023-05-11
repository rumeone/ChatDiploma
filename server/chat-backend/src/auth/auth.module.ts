import {Module} from '@nestjs/common';
import {AuthService} from './service/auth.service';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as process from "process";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {JwtAuthGuard} from "./guards/jwt.guard";

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async() => ({
      secret: process.env.SECRET_KEY,
      signOptions: {expiresIn: '10000s'}
    })
  })],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    exports: [AuthService]
})
export class AuthModule {
}
