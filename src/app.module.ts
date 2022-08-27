import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { CourseController } from './Controller/course.controller';
import { AppService } from './app.service';
import { CourseService } from './service/course.service';
import { isAuthenticated } from './app.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path/posix';
import { UserController } from './Controller/user.controller';
import { UserService } from './service/user.service';
import { Course, CourseSchema } from './model/course.schema';
import { PaperController } from './Controller/paper.controller';
import { PaperService } from './Service/paper.service';
import { Paper, PaperSchema } from './Model/paper.schema';
import { SolutionController } from './Controller/solution.controller';
import { SolutionService } from './Service/solution.service';
import { Solution, SolutionSchema } from './Model/solution.schema';

@Module({
  imports: [
    // Mongo config
    MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: Paper.name, schema: PaperSchema }]),
    MongooseModule.forFeature([
      { name: Solution.name, schema: SolutionSchema },
    ]),

    // Auth config
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  // Provide controller and services
  controllers: [
    AppController,
    UserController,
    CourseController,
    PaperController,
    SolutionController,
  ],
  providers: [
    AppService,
    UserService,
    CourseService,
    PaperService,
    SolutionService,
  ],
})

// Setup middleware for route protection
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(isAuthenticated)
  //     .exclude({ path: '', method: RequestMethod.GET })
  //     .forRoutes();
  // }
}
