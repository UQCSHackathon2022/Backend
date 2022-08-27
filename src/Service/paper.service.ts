import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Paper, PaperDocument } from '../Model/paper.schema';

@Injectable()
export class PaperService {
  constructor(
    @InjectModel(Paper.name) private paperModel: Model<PaperDocument>,
  ) {}

  async addPaper(paper: Paper): Promise<Paper> {
    const newPaper = new this.paperModel(paper);
    return newPaper.save();
  }

  async getPaper(id: string): Promise<Paper> {
    return await this.paperModel.findById(id).exec();
  }

  async getPapersForCourse(courseID: string) {
    return await this.paperModel.find({ course: courseID }).exec();
  }
}
