import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../model/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Course, CourseDocument } from 'src/model/course.schema';
import { CourseService } from './course.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(user: User): Promise<User> {
    // Encryption
    const salt = await bcrypt.genSalt();
    const pHash = await bcrypt.hash(user.password, salt);

    const reqBody = {
      sID: user.sID,
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      password: pHash,
    };

    // Generate a new user object and save to DB
    const newUser = new this.userModel(reqBody);
    console.log(newUser);
    return newUser.save();
  }

  async signin(user: User, jwt: JwtService): Promise<any> {
    // Compare given email again users and find matching account
    const foundUser = await this.userModel
      .findOne({ email: user.email })
      .exec();

    if (foundUser) {
      const { sID, fName, lName, password, email } = foundUser;

      //   Check password accuracy
      if (bcrypt.compare(user.password, password)) {
        // Create a token using email and return both token and current user info
        const payload = { email: user.email };
        return {
          token: jwt.sign(payload),
          user: { fName, lName, sID, email },
        };
      }
      return new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async getOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async AddCourse(user: User, courses): Promise<User> {
    console.log('user:' + user);

    for (let i = 0; i < courses.length; i++) {
      courses[i] = courses[i].course._id;
    }

    return await this.userModel.findOneAndUpdate(
      { email: user.email },
      { courses: courses },
    );
  }
}
