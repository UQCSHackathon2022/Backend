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
import { Paper } from '../Model/paper.schema';
import { PaperService } from '../Service/paper.service';

@Controller('/api/v1/paper')
export class PaperController {
  constructor(private readonly paperService: PaperService) {}

  @Post()
  async AddPaper(@Res() response, @Body() paper: Paper) {
    const newPaper = await this.paperService.addPaper(paper);
    return response.status(HttpStatus.CREATED).json({
      newPaper,
    });
  }

  @Get('/:courseID')
  async getPapersForCourse(@Param('courseID') courseID, @Res() response) {
    courseID = courseID.split('=')[1];

    const papers = await this.paperService.getPapersForCourse(courseID);
    return response.status(HttpStatus.OK).json({
      papers,
    });
  }

  @Get('/:id')
  async getPaper(@Param('id') id, @Res() response) {
    id = id.split('=')[1];

    const paper = await this.paperService.getPaper(id);
    return response.status(HttpStatus.OK).json({
      paper,
    });
  }
}
