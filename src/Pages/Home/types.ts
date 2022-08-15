export interface Task {
    id: number;
    check: boolean;
    createdAt: string;
    deadline: Date;
    task: string;
    updatedAt: string;
};

export type BodyTask = Omit<Task, 'id' | 'check' | 'createdAt' | 'updatedAt'>;