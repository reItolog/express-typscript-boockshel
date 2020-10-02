export interface ITodo{
  title: string;
  description: string;
  owner_id: string;
  completed?: boolean;
  update_at?: string;
}

export interface ITodoUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
  update_at?: Date;
}