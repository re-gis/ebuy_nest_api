/* eslint-disable */
import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/DTOS/register.dto';
import { User } from 'src/entities/User.entity';
import { ApiResponse } from 'src/payload/ApiResponse';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UtilsService } from 'src/utils/utils.service';
import { LoginDto } from 'src/DTOS/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
    private utilsService: UtilsService,
  ) {}

  async registerUser(dto: RegisterDto): Promise<ApiResponse> {
    let { username, email, password, isAdmin } = dto;
    if (!username || !email || !password) {
      return new ApiResponse(false, 'All credentials are required');
    } else {
      const existingUser = await this.userRepository.findOne({
        where: { email: email },
      });

      if (existingUser) {
        return new ApiResponse(false, 'User already have an account');
      } else {
        const userToCreate = new User(email, username, password, isAdmin);
        userToCreate.password = await this.utilsService.hashString(password);

        try {
          const userEntity = await this.userRepository.create(userToCreate);
          const createdUser = await this.userRepository.save({ ...userEntity });
          return new ApiResponse(
            true,
            'User registered successfully, Login to continue',
          );
        } catch (error) {
          console.log(error)
          throw new Error('Error while saving user...');
        }
      }
    }
  }

  async loginUser(dto: LoginDto): Promise<ApiResponse> {
    let { email, password } = dto;
    if (!email || !password) {
      return new ApiResponse(false, 'All credentials are required!');
    }

    // authenticate
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return new ApiResponse(false, 'Invalid email or password!');
    const token = await this.utilsService.generateToken(user);
    return new ApiResponse(true, 'User logged in successfully!', token);
  }

  async updateProfile(
    email: string,
    attrs: Partial<User>,
  ): Promise<ApiResponse> {
    // get the user by email
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) return new ApiResponse(false, 'User not found');

    Object.assign(user, attrs);
    await this.userRepository.save(user);
    return new ApiResponse(true, 'Profile updated successfully', user);
  }

  async getUserByEmail(email: string, entity: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) return `${entity} not found!`;
    return user;
  }

  async getLoggedInUser(email: string): Promise<ApiResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) return new ApiResponse(false, 'User not found!');
    return new ApiResponse(true, 'User fetched successfully', user);
  }

  async deleteUser(email: string): Promise<ApiResponse> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return new ApiResponse(false, 'User not found!');

    // delete the user
    await this.userRepository.remove(user);
    return new ApiResponse(true, 'User deleted successfully');
  }
}
