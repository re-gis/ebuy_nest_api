/* eslint-disable */
import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/DTOS/register.dto';
import { User } from 'src/entities/User';
import { ApiResponse } from 'src/payload/ApiResponse';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
  ) {}

  async registerUser(dto: RegisterDto): Promise<ApiResponse> {
    let { username, email, password } = dto;
    if (!username || !email || !password) {
      return new ApiResponse(false, 'All credentials are required');
    } else {
      const existingUser = await this.userRepository.findOne({
        where: { email: email },
      });

      if (existingUser) {
        return new ApiResponse(false, 'User already have an account');
      } else {
        // hash password && save to database
        const userToSave = new User(
          username,
          email,
          password: await bcrypt.hash(password, 10)
        );

        return new ApiResponse(
          true, "User registered successfully"
          ,userToSave
        )
        

      }
    }
  }
}
