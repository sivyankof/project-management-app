import { ITask } from '@shared/models/board-api-response.model';

export interface ITaskOfColumn {
    task: ITask;
    columnId: string;
}
