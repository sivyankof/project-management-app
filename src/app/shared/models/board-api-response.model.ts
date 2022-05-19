export interface IBoard {
    id: string;
    title: string;
    description: string;
    columns: IColumns[];
}

export interface IColumns {
    id: string;
    title: string;
    order: number;
    tasks?: ITask[];
}

export interface ITask {
    id?: string;
    title: string;
    done?: boolean;
    order?: number;
    description: string;
    userId?: string;
    boardId?: string;
    columnId?: string;
    files?: IFiles[];
}

export interface IFiles {
    filename: string;
    fileSize: number;
}
