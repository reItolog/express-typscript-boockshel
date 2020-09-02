import Todo from './TodoModel';
import { ITodo } from '../../shared/interfaces/todo';


class TodoModel {
  constructor(private todo = new Todo) {
  }

  async saveTodo(todo: ITodo) {
    const newTodo = new Todo(todo);
    try {
      return await newTodo.save().then()
        .catch(e => {
          console.log('Error Save Todo', e.message);
        });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getTodos() {
    try {
      return await this.todo.fetchAll()
        .catch(e => {
          console.log(e.message);
        });
    } catch (e) {
      throw new Error(e.message);
    }
  }

}

export const todoModel = new TodoModel();