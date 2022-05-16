export interface IBoardApiResponse {
    id: string;
    title: string;
    description: string;
    columns: IColumnsApiResponse[];
}

export interface IColumnsApiResponse {
    id: string;
    title: string;
    order: number;
    tasks?: ITaskApiResponse[];
}

export interface ITaskApiResponse {
    id?: string;
    title: string;
    done?: boolean;
    order?: number;
    description: string;
    userId?: string;
    boardId?: string;
    columnId?: string;
    files?: IFilesApiResponse[];
}

export interface IFilesApiResponse {
    filename: string;
    fileSize: number;
}
