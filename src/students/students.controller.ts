import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentServise: StudentsService) {}

  @Get()
  getAll() {
    return this.studentServise.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.studentServise.findOne(Number(id));
  }

  @Post()
  create(@Body('name') name: string) {
    return this.studentServise.create(name);
  }
}
