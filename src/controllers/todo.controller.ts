import * as express from 'express';
import { Request, Response } from 'express';
import { todoModel } from '../models/todo/todo.model';
import IControllerBase from 'interfaces/IControllerBase.interface';
import { ITodo } from '../shared/interfaces/todo';

class TodoController implements IControllerBase {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/todo', this.saveTodo);
    this.router.get('/todo', this.getTodos);
  }

  getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await todoModel.getTodos();
      console.log(todos);
      res.status(200).json({ todos });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };

  saveTodo = async (req: Request, res: Response) => {
    const { title, description, owner_id } = req.body;
    const newMedia: ITodo = {
      description,
      title,
      owner_id,
    };
    try {
      const newTodo = await todoModel.saveTodo(newMedia);
      res.status(201).json({ todo: newTodo });
    } catch (error) {
      res.json({ error });
    }
  };
}

export default TodoController;