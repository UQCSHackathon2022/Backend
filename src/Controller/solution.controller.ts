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
import { Solution } from '../Model/solution.schema';
import { SolutionService } from '../Service/solution.service';

@Controller('/api/v1/solution')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  @Post()
  async AddSolution(@Res() response, @Body() solution: Solution) {
    const newSolution = await this.solutionService.addSolution(solution);
    return response.status(HttpStatus.CREATED).json({
      newSolution,
    });
  }

  @Get('/:courseID')
  async getSolutionsForPaper(@Param('paperID') paperID, @Res() response) {
    paperID = paperID.split('=')[1];

    const solutions = await this.solutionService.getSolutionsForPaper(paperID);
    return response.status(HttpStatus.OK).json({
      solutions,
    });
  }

  @Get('/:id')
  async getPaper(@Param('id') id, @Res() response) {
    id = id.split('=')[1];
    id = +id;

    const paper = await this.solutionService.getSolution(id);
    return response.status(HttpStatus.OK).json({
      paper,
    });
  }
}
