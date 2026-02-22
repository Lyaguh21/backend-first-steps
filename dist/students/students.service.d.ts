export declare class StudentsService {
    private students;
    findAll(): {
        id: number;
        name: string;
    }[];
    findOne(id: number): {
        id: number;
        name: string;
    } | undefined;
    create(name: string): {
        id: number;
        name: string;
    };
}
