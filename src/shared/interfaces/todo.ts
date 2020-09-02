export interface ITodo{
  title: string;
  description: string;
  owner_id: number;
  compleated?: boolean;
  update_at?: Date;
}