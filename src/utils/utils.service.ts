/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/User.entity';
import { ApiResponse } from 'src/payload/ApiResponse';

@Injectable()
export class UtilsService {
  constructor(private configService: ConfigService, private jwt: JwtService) {}

  async hashString(input): Promise<string> {
    try {
      if (typeof input !== 'string') {
        throw new Error('Input must be a string!');
      } else {
        const hash: string = await bcrypt.hash(input, 10);
        return hash;
      }
    } catch (e) {
      throw new Error('Error while hashing password');
    }
  }

  async generateToken(user: User): Promise<string> {
    const token: string = await this.jwt.signAsync(
      { email: user.email, username: user.username },
      {
        expiresIn: '7d',
        secret: this.configService.get('SECRET_KEY'),
      },
    );

    return token;
  }

//   async getUserFromToken(token: string): Promise<ApiResponse> {
// 
//   }
}
