export interface ITodo{
  title: string;
  description: string;
  owner_id: number;
  compleated?: boolean;
  update_at?: Date;
}

export interface ITodoUpdate {
  title?: string;
  description?: string;
  compleated?: boolean;
  update_at?: Date;
}