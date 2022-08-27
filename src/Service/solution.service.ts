import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Solution, SolutionDocument } from '../Model/solution.schema';

@Injectable()
export class SolutionService {
  constructor(
    @InjectModel(Solution.name) private solutionModel: Model<SolutionDocument>,
  ) {}

  async addSolution(Solution: Solution): Promise<Solution> {
    const newSolution = new this.solutionModel(Solution);
    return newSolution.save();
  }

  async getSolution(id: string): Promise<Solution> {
    return await this.solutionModel.findById(id).exec();
  }

  async getSolutionsForPaper(paperID: string) {
    return await this.solutionModel.find({ paper: paperID });
  }
}
