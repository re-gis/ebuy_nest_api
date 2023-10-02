/*eslint-disable */
import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/DTOS/register.dto';
import { User } from 'src/entities/User';
import { ApiResponse } from 'src/payload/ApiResponse';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
    private userService: UsersService,
  ) {}

  @Post("/register")
  async register(@Body() dto:RegisterDto):Promise<ApiResponse> {
    // return this.userService
  }
}
