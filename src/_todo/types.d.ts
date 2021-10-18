export interface ITodo {
  id:string;
  createdAt:Date;
  task_name:string;
  isDone:boolean | undefined;
  task_description:string;
  serverKey?: string;
}

export interface ITodoWithDateObject extends ITodo{
  dateObject: IDateObject;
}


export interface IDateObject {
  date: number;
  month: number;
}
