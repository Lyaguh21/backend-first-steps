import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.student.findMany();
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  create(name: string, email?: string, age?: number) {
    return this.prisma.student.create({ data: { name, email, age } });
  }

  async remove(id: number) {
    await this.prisma.student.delete({ where: { id } });
    return { message: `Student with id ${id} has been removed.` };
  }
}
