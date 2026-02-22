import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentServise;
    constructor(studentServise: StudentsService);
    getAll(): {
        id: number;
        name: string;
    }[];
    getOne(id: string): {
        id: number;
        name: string;
    } | undefined;
    create(name: string): {
        id: number;
        name: string;
    };
}
