export interface IUser {
  first_name?: string,
  last_name?: string,
  email?: string,
  password?: string,
}

export interface IUserMedia {
  first_name: string,
  last_name: string,
  email: string,
  avatar?: {
    url: string;
    mime_type: string;
  }
}