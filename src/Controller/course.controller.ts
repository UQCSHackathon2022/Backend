import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Res,
  Req,
  Param,
} from '@nestjs/common';
import { Course } from '../model/course.schema';
import { CourseService } from '../service/course.service';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';

@Controller('/api/v1/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async AddCourse(@Res() response, @Body() course: Course) {
    const newCourse = await this.courseService.createCourse(course);
    return response.status(HttpStatus.CREATED).json({
      newCourse,
    });
  }

  @Get('/:code')
  async getCourse(@Param('code') code, @Res() response, @Req() request) {
    console.log('here');
    code = code.split('=')[1];
    const prefix = code.slice(0, 4);
    const suffix = code.slice(4);

    const course = await this.courseService.getCourse(prefix, suffix);
    console.log(course);
    return response.status(HttpStatus.OK).json({
      course,
    });
  }
}
