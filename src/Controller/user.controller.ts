import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Param,
} from '@nestjs/common';
import { User } from '../model/user.schema';
import { UserService } from '../service/user.service';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
import { CourseService } from '../Service/course.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('/:email')
  async GetUser(@Param('email') email: string, @Res() response) {
    email = email.split('=')[1];
    const user = await this.userService.getOne(email);
    return response.status(HttpStatus.OK).json({ user });
  }

  @Post('/signup')
  async Signup(@Res() response, @Body() user: User) {
    const newUser = await this.userService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @Post('/signin')
  async SignIn(@Res() response, @Body() user: User): Promise<User> {
    const body = await this.userService.signin(user, this.jwtService);
    return response.status(HttpStatus.OK).json({ body });
  }

  @Post('/addCourse')
  async AddCourse(@Res() response, @Body() body) {
    const user = body.user;
    const courses = body.courses;

    await this.userService.AddCourse(user, courses);
  }
}
