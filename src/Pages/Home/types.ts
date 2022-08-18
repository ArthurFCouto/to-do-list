export interface Task {
    id: number;
    check: boolean;
    createdAt: string;
    deadline: Date;
    task: string;
    updatedAt: string;
};

export type BodyTask = Omit<Task, 'id' | 'check' | 'createdAt' | 'updatedAt'>;

export interface PropsActivities {
    id: number;
    create: string;
    task: string;
    deadline: Date;
    check?: boolean;
    updatedAt?: string;
    status: 'pending' | 'completed';
    setAlert: Function;
}