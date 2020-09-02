export interface ITodo{
  title: string;
  description: string;
  owner_id: number;
  completed?: boolean;
  update_at?: Date;
}

export interface ITodoUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
  update_at?: Date;
}