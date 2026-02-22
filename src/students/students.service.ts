import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.student.findMany();
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  create(dto: CreateStudentDto) {
    return this.prisma.student.create({ data: dto });
  }

  async update(id: number, dto: UpdateStudentDto) {
    const existing = await this.prisma.student.findUnique({ where: { id } });
    if (!existing) return null;
    return this.prisma.student.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const existing = await this.prisma.student.findUnique({ where: { id } });
    if (!existing) return null;

    await this.prisma.student.delete({ where: { id } });
    return true;
  }
}
