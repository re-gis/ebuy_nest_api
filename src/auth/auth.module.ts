/* eslint-disable */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { UsersService } from 'src/users/users.service';
import { UtilsModule } from 'src/utils/utils.module';
import { UtilsService } from 'src/utils/utils.service';
import { JwtService, JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UtilsModule, JwtModule],
  controllers: [AuthController],
  providers: [UsersService, UtilsService, JwtService],
})
export class AuthModule {}
