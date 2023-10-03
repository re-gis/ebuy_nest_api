/* eslint-disable */
import { Controller, Put, UseGuards, Body, Get, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/user.decorator';
import { User } from 'src/entities/User.entity';
import { ApiResponse } from 'src/payload/ApiResponse';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Put('/update-profile')
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(
    @GetUser() user: User,
    @Body() attrs: Partial<User>,
  ): Promise<ApiResponse> {
    return this.userService.updateProfile(user.email, attrs);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@GetUser() user: User): Promise<ApiResponse> {
    return this.userService.getLoggedInUser(user.email);
  }

  @Delete('/delete/me')
  @UseGuards(JwtAuthGuard)
  async deleteUserAccnt(@GetUser() user: User): Promise<ApiResponse> {
    return this.userService.deleteUser(user.email);
  }
}
