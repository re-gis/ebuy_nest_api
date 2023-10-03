/* eslint-disable*/
import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { JwtService, JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [UtilsService, JwtService],
})
export class UtilsModule {}
