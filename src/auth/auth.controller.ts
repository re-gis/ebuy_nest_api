/*eslint-disable */
import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/DTOS/login.dto';
import { RegisterDto } from 'src/DTOS/register.dto';
import { User } from 'src/entities/User.entity';
import { ApiResponse } from 'src/payload/ApiResponse';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
    private userService: UsersService,
  ) {}

  @Post('/register')
  async register(@Body() dto: RegisterDto): Promise<ApiResponse> {
    return this.userService.registerUser(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<ApiResponse> {
    return this.userService.loginUser(dto);
  }
}
