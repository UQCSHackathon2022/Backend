import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from '../model/course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async createCourse(course: Course): Promise<Course> {
    const newCourse = new this.courseModel(course);
    return newCourse.save();
  }

  async getCourse(prefix: string, suffix: number): Promise<Course> {
    return await this.courseModel.findOne({ prefix, suffix }).exec();
  }
}
