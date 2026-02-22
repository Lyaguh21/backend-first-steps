import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {
  private students = [
    { id: 1, name: 'Alla' },
    {
      id: 2,
      name: 'Igor',
    },
  ];

  findAll() {
    return this.students;
  }

  findOne(id: number) {
    return this.students.find((el) => el.id === id);
  }

  create(name: string) {
    const newStudent = {
      id: this.students.length + 1,
      name: name,
    };

    this.students.push(newStudent);

    return newStudent;
  }
}
